package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models.FavouriteMapping
import play.api.libs.json.Json
import play.api.mvc._
import repositories.FavouritesRepository
import silhouette.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class FavouritesController @Inject()(cc: MessagesControllerComponents,
                                     silhouette: Silhouette[DefaultEnv],
                                     val controllerComponents: ControllerComponents,
                                     val favouritesRepository: FavouritesRepository)(implicit ec: ExecutionContext) extends BaseController {


  def addProductToFavourites(productId: Long) = silhouette.SecuredAction.async { implicit request =>
    val mapping = FavouriteMapping(request.identity.id, productId)
    favouritesRepository.addFavourite(mapping)
    Future(Ok(Json.toJson(mapping)))
  }

  def removeFromFavourites(productId: Long) = silhouette.SecuredAction.async { implicit request =>
    val favourite = new FavouriteMapping(request.identity.id, productId)
    favouritesRepository.deleteFavourite(favourite)
    Future(Ok("Deleted"))
  }

  def getFavourites(): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    favouritesRepository.getFavouritesForUser(request.identity.id).map(favourites => Ok(Json.toJson(favourites)))
  }
}
