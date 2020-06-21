package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models.{Opinion, UserAwareOpinion}
import play.api.libs.json.Json
import play.api.mvc._
import repositories.OpinionRepository
import silhouette.DefaultEnv

import scala.concurrent.ExecutionContext

@Singleton
class OpinionController @Inject()(val controllerComponents: ControllerComponents,
                                  silhouette: Silhouette[DefaultEnv],
                                  val opinionRepository: OpinionRepository)(implicit ec: ExecutionContext) extends BaseController {


  def getOpinionsForProduct(productId: Long) = Action.async { implicit request: Request[AnyContent] =>
    opinionRepository.getByProductId(productId).map(opinions => Ok(Json.toJson(opinions)))
  }

  def createOpinion(): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val opinion = request.body.asJson.get.as[Opinion]
    val userAwareOpinion = new UserAwareOpinion(0, opinion.review, opinion.stars, request.identity.firstName + " " + request.identity.lastName, opinion.product)
    opinionRepository.addOpinion(userAwareOpinion).map(added => Ok(Json.toJson(added)))
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
