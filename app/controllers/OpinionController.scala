package controllers

import javax.inject._
import models.Opinion
import play.api.libs.json.Json
import play.api.mvc._
import repositories.OpinionRepository

import scala.concurrent.ExecutionContext

@Singleton
class OpinionController @Inject()(val controllerComponents: ControllerComponents, val opinionRepository: OpinionRepository)(implicit ec: ExecutionContext) extends BaseController {


  def getOpinionsForProduct(productId: Long) = Action.async { implicit request: Request[AnyContent] =>
    opinionRepository.getByProductId(productId).map(opinions => Ok(Json.toJson(opinions)))
  }

  def createOpinion(): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    val opinion = request.body.asJson.get.as[Opinion]
    opinionRepository.addOpinion(opinion).map(added => Ok(Json.toJson(added)))
  }

  def addStarRatingForProduct(productId: Long) = Action { implicit request: Request[AnyContent] =>
 Ok
  }

  def getStarRatingForProduct(productId: Long) = Action.async { implicit request: Request[AnyContent] =>
    opinionRepository.getStarRatingForProduct(productId).map {
      case Some(rating) => Ok(Json.toJson(rating))
      case None => BadRequest("No user found " + Json.toJson(productId))
    }
  }

  def deleteOpinion(opinionId: Long) = Action.async { implicit request: Request[AnyContent] =>
    opinionRepository.deleteOpinion(opinionId).map(_ => Ok("Deleted"))
  }
}
