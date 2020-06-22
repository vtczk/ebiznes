package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {


  def getCart() = Action { implicit request: Request[AnyContent] =>
    Ok
  }

  def addToCart(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok
  }

  def removeFromCart(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok
  }

}
