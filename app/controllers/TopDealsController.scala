package controllers

import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._
import repositories.TopDealsRepository

import scala.concurrent.ExecutionContext

@Singleton
class TopDealsController @Inject()(val controllerComponents: ControllerComponents, val topdealsRepository: TopDealsRepository)
                                  (implicit ec: ExecutionContext) extends BaseController {


  def getTopDeals() = Action.async { implicit request =>
    topdealsRepository.allTopdeals().map(deals => Ok(Json.toJson(deals)))
  }

  def addTopDeal(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok
  }

  def removeTopDeal(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok
  }

}
