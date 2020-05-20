package controllers

import javax.inject._
import models.User
import play.api.libs.json.Json
import play.api.mvc._
import repositories.UserRepository

import scala.concurrent.ExecutionContext

@Singleton
class AuthenticationController @Inject()(val controllerComponents: ControllerComponents, userRepository: UserRepository)(implicit ec: ExecutionContext) extends BaseController {


  def login(): Action[AnyContent] = Action { implicit request =>
    Ok
  }

  def loginHandle(): Action[AnyContent] = Action.async { implicit request =>
    val user = request.body.asJson.get.as[User]
    userRepository
      .isPresent(user)
      .map {
        case Some(usr) => Ok("Authentication succeful" + Json.toJson(usr))
        case None => Unauthorized("No user found " + Json.toJson(user))
      }
  }

  def register() = Action { implicit request =>
    Ok

  }

  def registerHandle(): Action[AnyContent] = Action.async { implicit request =>
    val user = request.body.asJson.get.as[User]
    userRepository
      .add(user)
      .map(usr => Ok(Json.toJson(usr)))
  }
}
