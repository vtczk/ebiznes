package controllers

import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._
import repositories.ProductRepository

import scala.concurrent.ExecutionContext

@Singleton
class SearchController @Inject()(val controllerComponents: ControllerComponents, productRepository: ProductRepository)(implicit ec: ExecutionContext) extends BaseController {


  def searchForProduct(keyword: String) = Action.async { implicit request: Request[AnyContent] =>
    productRepository.searchForProduct(keyword).map {
      case Some(product) => Ok(Json.toJson(product))
      case None => NoContent
    }
  }

}
