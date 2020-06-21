package controllers

import com.mohiva.play.silhouette.api.util.Credentials
import com.mohiva.play.silhouette.api.{LoginEvent, LoginInfo, Silhouette}
import com.mohiva.play.silhouette.impl.exceptions.{IdentityNotFoundException, InvalidPasswordException}
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject.{Inject, Singleton}
import models.UserIdentity
import play.api.i18n.I18nSupport
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc.{MessagesAbstractController, MessagesControllerComponents}
import services.UserService
import silhouette.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class LoginController @Inject()(cc: MessagesControllerComponents,
                                silhouette: Silhouette[DefaultEnv],
                                userService: UserService,
                                credentialsProvider: CredentialsProvider)
                               (implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) with I18nSupport {

  def submit() = silhouette.UnsecuredAction(parse.json).async { implicit request =>
    val emptyStringMsg = "cannot be empty"
    implicit val signInRead = (
      (JsPath \ "email").read[String].filter(JsonValidationError(emptyStringMsg))(x => x != null && !x.isEmpty) and
        (JsPath \ "password").read[String].filter(JsonValidationError(emptyStringMsg))(x => x != null && !x.isEmpty)
      ) (SignInRequest.apply _)

    val validation = request.body.validate[SignInRequest](signInRead)
    validation match {
      case e: JsError => Future(Status(BAD_REQUEST)(JsError.toJson(e)))
      case s: JsSuccess[SignInRequest] => {
        val data = s.value
        authenticateWithCredentials(data.email, data.password).flatMap {
          case Success(user) => {
            val loginInfo = LoginInfo(CredentialsProvider.ID, user.email)
            for {
              authenticator <- silhouette.env.authenticatorService.create(loginInfo)
              token <- silhouette.env.authenticatorService.init(authenticator)
              result <- silhouette.env.authenticatorService.embed(token, Ok(
                Json.obj(
                  "token" -> token,
                  "tokenExpiry" -> authenticator.expirationDateTime.getMillis,
                  "email" -> user.email,
                  "role" -> user.role,
                  "id" -> user.id
                )))
            } yield {
              silhouette.env.eventBus.publish(LoginEvent(user, request))
              result
            }
          }
          case InvalidPassword =>
            Future.successful(Forbidden(Json.obj("msg" -> "invalid email/password")))
          case UserNotFound =>
            Future.successful(Forbidden(Json.obj("msg" -> "invalid email/password")))
        }
      }
    }
  }

  def authenticateWithCredentials(email: String, password: String) = {
    val credentials = Credentials(email, password)
    credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
      userService.retrieve(loginInfo).map {
        case Some(user) => Success(user)
        case None => UserNotFound
      }
    }.recoverWith {
      case _: InvalidPasswordException => Future.successful(InvalidPassword)
      case _: IdentityNotFoundException => Future.successful(UserNotFound)
      case e => Future.failed(e)
    }
  }

  case class SignInRequest(email: String, password: String)

  sealed trait AuthenticateResult

  case class Success(user: UserIdentity) extends AuthenticateResult

  object InvalidPassword extends AuthenticateResult

  object UserNotFound extends AuthenticateResult

}
