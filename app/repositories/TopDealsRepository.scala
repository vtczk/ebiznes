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


  def allTopdeals(): Future[Seq[TopDeal]] = db.run {
    topdeals.result
  }
}