package controllers

import javax.inject._
import models.TopDeal
import play.api.libs.json.Json
import play.api.mvc._
import repositories.TopDealsRepository
import play.api.data.Form
import play.api.data.Forms.{mapping, _}

import scala.util.{Failure, Success}
import scala.concurrent.{ExecutionContext, Future}


@Singleton
class TopDealsController @Inject()(messagesControllerComponents: MessagesControllerComponents, val topdealsRepository: TopDealsRepository)
                                  (implicit ec: ExecutionContext) extends MessagesAbstractController(messagesControllerComponents) {

  var products: Seq[TopDeal] = Seq[TopDeal]()

  val createForm: Form[CreateTopDealForm] = Form {
    mapping(
      "id" -> longNumber,
      "discount" -> longNumber,
      "product" -> longNumber,

    )(CreateTopDealForm.apply)(CreateTopDealForm.unapply)
  }

  val updateForm: Form[UpdateTopDealForm] = Form {
    mapping(
      "id" -> longNumber,
      "discount" -> longNumber,
      "product" -> longNumber,

    )(UpdateTopDealForm.apply)(UpdateTopDealForm.unapply)
  }

  val deleteForm: Form[DeleteTopDealForm] = Form {
    mapping(
      "id" -> longNumber,


    )(DeleteTopDealForm.apply)(DeleteTopDealForm.unapply)
  }

  def getTopDeals() = Action.async { implicit request =>
    topdealsRepository.allTopdeals().map(deals => Ok(Json.toJson(deals)))
  }


  def addTopDealForm(): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
    val formProduct = topdealsRepository.list()
    for {
      products <- formProduct
    } yield Ok(views.html.dealCreate(createForm, products))
  }



  def saveAddTopDeal(): Action[AnyContent] = Action.async { implicit request =>

    createForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.dealCreate(errorForm, products))
        )
      },
      product => {
        val p = new TopDeal(product.id, product.discount, product.product)
        topdealsRepository.addProduct(p).map { _ =>
          routes.TopDealsController.addTopDealForm()
          Ok("Deal added")
        }
      }
    )
  }


  def updateTopDealForm(id: Long): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
    topdealsRepository.getById(id).map(product => {
      val filledUpdateForm = updateForm.fill(UpdateTopDealForm(product.id, product.discount, product.product))
      Ok(views.html.dealUpdate(filledUpdateForm, products))
    })

  }
  def saveUpdatedDeal(): Action[AnyContent] = Action.async { implicit request =>

    updateForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.dealUpdate(errorForm, products))
        )
      },
      product => {

        topdealsRepository.update(TopDeal(product.id, product.discount, product.product)).map { _ =>
          routes.TopDealsController.updateTopDealForm(product.id)
          Ok("Deal updated")
        }
      }
    )
  }

  def deleteForm(id: Long): Action[AnyContent] = Action.async { implicit request =>
    topdealsRepository.getById(id).map(product => {
      val deleteDForm = deleteForm.fill(DeleteTopDealForm(product.id))
      Ok(views.html.dealDelete(deleteDForm, products))
    })
  }

  def deleteDeal(): Action[AnyContent] = Action.async { implicit request =>
    deleteForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          BadRequest(views.html.dealDelete(errorForm, products))
        )
      },
      product => {

        topdealsRepository.delete(product.id).map { _ =>
          routes.TopDealsController.deleteForm(product.id)
          Ok("Deal deleted")
        }
      }
    )
  }
  def addTopDeal(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok
  }

  def removeTopDeal(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok
  }

}
case class CreateTopDealForm(id:Long, discount:Long, product: Long)
case class UpdateTopDealForm(id:Long, discount:Long, product: Long)
case class DeleteTopDealForm(id:Long)
