package controllers

import javax.inject._
import play.api.mvc._
import repositories.ProductRepository
import models.Product
import play.api.libs.json.{JsValue, Json}

import scala.concurrent.ExecutionContext

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents, productRepository: ProductRepository)(implicit ec: ExecutionContext) extends BaseController {


  def getAll: Action[AnyContent] = Action.async { implicit request =>
    productRepository
      .getAll()
      .map(products => {
        Ok(Json.toJson(products))
      })
  }

  def getByCategory(categoryId:Int): Action[AnyContent] = Action.async { implicit request =>
    productRepository
      .getByCategory(categoryId)
      .map(products => {
        Ok(Json.toJson(products))
      })
  }

  def addProduct(): Action[AnyContent] = Action.async { implicit request =>
    val product: Product = request.body.asJson.get.as[Product]
    productRepository
      .addProduct(product)
      .map(productResponse => Ok(Json.toJson(productResponse))
      )
  }

  def deleteProduct(productId: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    productRepository.delete(productId).map(_ => Ok("deleted"))
  }

  def updateProduct(productId: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    val product: Product = request.body.asJson.get.as[Product]
    productRepository.update(product).map(value => Ok("updated"))

  }

  def getById(productId: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    productRepository
      .getById(productId)
      .map(value => Ok(Json.toJson(value))
      );

  }

  def setQuantity(productId: Long, amount: Long) = Action.async { implicit request: Request[AnyContent] =>

    productRepository.setQuantity(productId, amount).map(q => {
      Ok("Updated quantity")
    })

  }
}
