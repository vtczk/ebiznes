package repositories

import javax.inject.{Inject, Singleton}
import models.{Category, Opinion, TopDeal}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TopDealsRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider,
                                   val productRepository: ProductRepository,
                                  )(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._
  import productRepository.ProductTable

  class TopDealsTable(tag: Tag) extends Table[TopDeal](tag, "topdeals") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def product = column[Long]("product")

    def discount = column[Long]("discount")

    def product_fk = foreignKey("cat_fk", product, products)(_.id)

    def * = (id, discount, product) <> ((TopDeal.apply _).tupled, TopDeal.unapply)
  }

  private val products = TableQuery[ProductTable]
  private val topdeals = TableQuery[TopDealsTable]

  def addProduct(newProduct: TopDeal): Future[TopDeal] = db.run {
    topdeals returning topdeals.map(_.id) into ((newProduct, id) => newProduct.copy(id = id)) += (newProduct)
  }

  def allTopdeals(): Future[Seq[TopDeal]] = db.run {
    topdeals.result
  }

  def list(): Future[Seq[TopDeal]] = db.run {
    topdeals.result
  }

  def getById(id: Long): Future[TopDeal] = db.run {
    topdeals.filter(_.id === id).result.head
  }

  def delete(id: Long): Future[Unit] = db.run(topdeals.filter(_.id === id).delete).map(_ => ())

  def update(newT: TopDeal): Future[Unit] = {
    db.run(topdeals.filter(_.id === newT.id).update(newT)).map(_ => ())
  }
}