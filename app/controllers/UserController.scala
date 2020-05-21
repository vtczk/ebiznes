package controllers

import models.User
import javax.inject._
import play.api.mvc._
import play.api.data.Form
import play.api.data.Forms.{mapping, _}
import play.api.libs.json.Json
import repositories.UserRepository

import scala.util.{Failure, Success}
import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(messagesControllerComponents: MessagesControllerComponents, userRepository: UserRepository)(implicit ec: ExecutionContext) extends MessagesAbstractController(messagesControllerComponents) {

 var users : Seq[User] = Seq[User]()

 val deleteUserForm: Form[DeleteUserForm] = Form {
  mapping(
   "id" -> longNumber
  )(DeleteUserForm.apply)(DeleteUserForm.unapply)
 }

 def deleteFormUser(id: Long): Action[AnyContent] = Action.async { implicit request =>
 userRepository.getById(id).map(u => {
   val deletePForm = deleteUserForm.fill(DeleteUserForm(u.id))
   Ok(views.html.userDelete(deletePForm, users))
  })
 }

 def saveDeleteUser(): Action[AnyContent] = Action.async { implicit request =>
  deleteUserForm.bindFromRequest.fold(
   errorForm => {
    Future.successful(
     BadRequest(views.html.userDelete(errorForm, users))
    )
   },
   u => {

    userRepository.delete(u.id).map { _ =>
     routes.UserController.deleteFormUser(u.id)
     Ok("User deleted")
    }
   }
  )
 }

 def settings() = Action { implicit request: Request[AnyContent] =>
 Ok
  }

  def settingHandle() = Action { implicit request: Request[AnyContent] =>
 Ok
  }

  def logout() = Action { implicit request: Request[AnyContent] =>
 Ok
  }
}
case class DeleteUserForm(id: Long)
