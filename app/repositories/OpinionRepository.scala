package repositories

import com.google.inject.Inject
import javax.inject.Singleton
import models.UserAwareOpinion
import play.api.db.slick.DatabaseConfigProvider
import play.api.mvc.{Action, AnyContent, Request}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class OpinionRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val productRepository: ProductRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import productRepository.ProductTable
  import profile.api._

  private val productTable = TableQuery[ProductTable]
  private val opinions = TableQuery[OpinionTable]

   class OpinionTable(tag: Tag) extends Table[UserAwareOpinion](tag, "opinion") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def review = column[String]("review")

    def stars = column[Int]("stars")

    def userName = column[String]("userName")

    def product = column[Long]("product")

    def productFk = foreignKey("cat_fk", product, productTable)(_.id)

    def * = (id, review, stars, userName, product) <> ((UserAwareOpinion.apply _).tupled, UserAwareOpinion.unapply)
  }

  def addOpinion(opinion: UserAwareOpinion): Future[UserAwareOpinion] = db.run {
    opinions returning opinions.map(_.id) into ((newProduct, id) => newProduct.copy(id = id)) += opinion
  }

  def getByProductId(productId: Long): Future[Seq[UserAwareOpinion]] = db.run {
    opinions.filter(_.product === productId).result
  }

  def getStarRatingForProduct(productId: Long): Future[Option[Int]] = db.run {
    opinions.filter(_.product === productId).map(_.stars).avg.result

  }


  def deleteOpinion(opinionId: Long): Future[Unit] = db.run(opinions.filter(_.id === opinionId).delete).map(_ => ())

}
