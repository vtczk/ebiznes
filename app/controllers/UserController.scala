package controllers

import javax.inject._
import play.api.mvc._

class UserController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

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
