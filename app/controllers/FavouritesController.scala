package controllers

import javax.inject._
import models.FavouriteMapping
import play.api.libs.json.Json
import play.api.mvc._
import repositories.FavouritesRepository

import scala.concurrent.ExecutionContext

@Singleton
class FavouritesController @Inject()(val controllerComponents: ControllerComponents, val favouritesRepository: FavouritesRepository)(implicit ec: ExecutionContext) extends BaseController {


  def addProductToFavourites() = Action { implicit request: Request[AnyContent] =>
    val favourite = request.body.asJson.get.as[FavouriteMapping]
    favouritesRepository.addFavourite(favourite)
    Ok(Json.toJson(favourite))
  }

  def removeFromFavourites(userId: Long, productId: Long) = Action { implicit request: Request[AnyContent] =>
    val favourite = new FavouriteMapping(userId, productId)
    favouritesRepository.deleteFavourite(favourite)
    Ok("Deleted")
  }

  def getFavourites(userId: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    favouritesRepository.getFavouritesForUser(userId).map(favourites => Ok(Json.toJson(favourites)))
  }
}
