package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class PaymentController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {


  def payment(paymentId: Long) = Action { implicit request: Request[AnyContent] =>
 Ok
  }

  def createPayment(paymentId: Long) = Action { implicit request: Request[AnyContent] =>
 Ok
  }

  def listPayments(userId:Long) = Action { implicit request: Request[AnyContent] =>
 Ok
  }

  def cancelPayment(paymentId: Long) = Action { implicit request: Request[AnyContent] =>
 Ok
  }
}
