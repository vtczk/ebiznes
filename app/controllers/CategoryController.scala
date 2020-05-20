package controllers

import javax.inject._
import models.Category
import play.api.libs.json.Json
import play.api.mvc._
import repositories.{CategoryRepository, TopDealsRepository}

import scala.concurrent.ExecutionContext

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents,
                                   categoryRepository: CategoryRepository,topDealsRepository:TopDealsRepository)(implicit ec: ExecutionContext) extends BaseController {

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
}
