package controllers

import javax.inject._
import models.Category
import play.api.data.Form
import play.api.data.Forms.{mapping, _}
import play.api.libs.json.Json
import play.api.mvc._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}
import repositories.{CategoryRepository, TopDealsRepository}



@Singleton
class CategoryController @Inject()(messagesControllerComponents: MessagesControllerComponents,
                                   categoryRepository: CategoryRepository,topDealsRepository:TopDealsRepository)(implicit ec: ExecutionContext) extends MessagesAbstractController(messagesControllerComponents) {


  var categories: Seq[Category] = Seq[Category]()

  val categoryCreateForm: Form[CreateCategoryForm] = Form {
    mapping(
      "id" -> number,
      "name" -> nonEmptyText,

    )(CreateCategoryForm.apply)(CreateCategoryForm.unapply)
  }


  val updateCategoryForm: Form[UpdateCategoryForm] = Form {
    mapping(
      "id" -> number,
      "name" -> nonEmptyText

    )(UpdateCategoryForm.apply)(UpdateCategoryForm.unapply)
  }

  val deleteCategoryForm: Form[DeleteCategoryForm] = Form {
    mapping(
      "id" -> number
    )(DeleteCategoryForm.apply)(DeleteCategoryForm.unapply)
  }



  def listCategories(): Action[AnyContent] = Action.async { implicit request =>
    categoryRepository
      .getAll()
      .map(categories => Ok(Json.toJson(categories)))
  }

  def addCategory(): Action[AnyContent] = Action.async { implicit request =>
    val category = request.body.asJson.get.as[Category]
    categoryRepository.add(category.name).map(added => Ok(Json.toJson(added)))
  }

  def updateCategory(): Action[AnyContent] = Action.async { implicit request =>
    val category = request.body.asJson.get.as[Category]
    categoryRepository.update(category).map(_ => Ok("updated"))
  }

  def deleteCategory(categoryId: Int): Action[AnyContent] = Action.async { implicit request =>
    categoryRepository.delete(categoryId).map(_ => Ok("deleted"))
  }


  def addFormCat(): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
    val formCategory = categoryRepository.list()
    for {
      categories <- formCategory
    } yield Ok(views.html.categoryCreate(categoryCreateForm, categories))
  }


  def saveAddCat(): Action[AnyContent] = Action.async { implicit request =>


    categoryCreateForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.categoryCreate(errorForm, categories))
        )
      },
      category => {
        println(category)
        categoryRepository.add(category.name).map { _ =>
          routes.CategoryController.addFormCat()
          Ok("Category added")
        }
      }
    )
  }


  def updateFormCat(id: Int): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>

    categoryRepository.getById(id).map(category => {
      val filledUpdateForm = updateCategoryForm.fill(UpdateCategoryForm(category.id, category.name))
      Ok(views.html.categoryUpdate(filledUpdateForm, categories))
    })

  }
  def saveUpdateCategory(): Action[AnyContent] = Action.async { implicit request =>
    updateCategoryForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.categoryUpdate(errorForm, categories))
        )
      },
      category => {

        categoryRepository.update(Category(category.id, category.name)).map { _ =>
          routes.CategoryController.updateFormCat(category.id)
          Ok("Category updated")
        }
      }
    )
  }

  def deleteFormCat(id: Int): Action[AnyContent] = Action.async { implicit request =>
    categoryRepository.getById(id).map(product => {
      val deleteCForm = deleteCategoryForm.fill(DeleteCategoryForm(product.id))
      Ok(views.html.categoryDelete(deleteCForm, categories))
    })
  }

  def saveDeleteCat(): Action[AnyContent] = Action.async { implicit request =>
    deleteCategoryForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.categoryDelete(errorForm, categories))
        )
      },
      category => {

        categoryRepository.delete(category.id).map { _ =>
          routes.CategoryController.deleteFormCat(category.id)

          Ok("Category deleted")
        }
      }
    )
  }


}
case class CreateCategoryForm(id: Int, name: String)
case class UpdateCategoryForm(id: Int, name: String)
case class DeleteCategoryForm(id: Int)