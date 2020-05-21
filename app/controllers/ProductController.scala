package controllers

import javax.inject._
import repositories.ProductRepository
import models.Product
import play.api.libs.json.{JsValue, Json}
import play.api.data.Form
import play.api.data.Forms.{mapping, _}
import play.api.mvc._

import scala.util.{Failure, Success}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductController @Inject()(messagesControllerComponents: MessagesControllerComponents, productRepository: ProductRepository)(implicit ec: ExecutionContext) extends MessagesAbstractController(messagesControllerComponents) {

  var products: Seq[Product] = Seq[Product]()

  val createProductForm: Form[CreateProductForm] = Form {
    mapping(
      "id" -> longNumber,
      "name" -> nonEmptyText,
      "description" -> nonEmptyText,
      "price" -> number,
      "image" -> nonEmptyText,
      "category" -> number
    )(CreateProductForm.apply)(CreateProductForm.unapply)
  }

  val updateProductForm: Form[UpdateProductForm] = Form {
    mapping(
      "id" -> longNumber,
      "name" -> nonEmptyText,
      "description" -> nonEmptyText,
      "price" -> number,
      "image" -> nonEmptyText,
      "category" -> number
    )(UpdateProductForm.apply)(UpdateProductForm.unapply)
  }


  val deleteProductForm: Form[DeleteProductForm] = Form {
    mapping(
      "id" -> longNumber
    )(DeleteProductForm.apply)(DeleteProductForm.unapply)
  }


  def addFormProd(): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
    val formProduct = productRepository.list()
    for {
      products <- formProduct
    } yield Ok(views.html.productCreate(createProductForm, products))
  }



  def saveAddProd(): Action[AnyContent] = Action.async { implicit request =>
    createProductForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.productCreate(errorForm, products))
        )
      },
      product => {
        println(product)
        val prod = new Product(product.id, product.name, product.description, product.price, product.image, product.category)
        productRepository.addProduct(prod).map { _ =>
          routes.ProductController.addFormProd()
          Ok("Product added")
        }
      }
    )
  }

//  def updateFormProd(id: Long): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
//    productRepository.getById(id).map(product => {
//      val filledForm = updateProductForm.fill(UpdateProductForm(product.id, product.name,product.description, product.price.toInt, product.image, product.category))
//      Ok(views.html.productUpdate(filledForm, products))
//    })
//
//
//  }
//  def saveUpdateProd(): Action[AnyContent] = Action.async { implicit request =>
//
//    updateProductForm.bindFromRequest.fold(
//      errorForm => {
//        Future.successful(
//          BadRequest(views.html.productUpdate(errorForm, products))
//        )
//      },
//      product => {
//        productRepository.update(Product(product.id, product.name, product.description, product.price, product.image, product.category)).map { _ =>
//          routes.ProductController.updateFormProd(product.id)
//          Ok("Product updated")
//        }
//      }
//    )
//  }


  def deleteFormProd(id: Long): Action[AnyContent] = Action.async { implicit request =>
    productRepository.getById(id).map(product => {
      val deletePForm = deleteProductForm.fill(DeleteProductForm(product.id))
      Ok(views.html.productDelete(deletePForm, products))
    })
  }

  def saveDeleteProd(): Action[AnyContent] = Action.async { implicit request =>
    deleteProductForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.productDelete(errorForm, products))
        )
      },
      product => {

        productRepository.delete(product.id).map { _ =>
          routes.ProductController.deleteFormProd(product.id)
          Ok("Product deleted")
        }
      }
    )
  }

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
case class CreateProductForm(id: Long, name: String, description: String, price: Int, image: String, category: Int)
case class UpdateProductForm(id: Long, name: String, description: String, price: Int, image: String, category: Int)
case class DeleteProductForm(id: Long)
