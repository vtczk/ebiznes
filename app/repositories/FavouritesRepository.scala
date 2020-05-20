package repositories

import com.google.inject.Inject
import javax.inject.Singleton
import models.{FavouriteMapping, Product}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.lifted.TableQuery

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class FavouritesRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val productRepository: ProductRepository, val userRepository: UserRepository)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import productRepository.ProductTable

  private val products = TableQuery[ProductTable]
  private val favourites = TableQuery[Favourites]

  import profile.api._


  private class Favourites(tag: Tag) extends Table[FavouriteMapping](tag, "favourites") {
    def user = column[Long]("user")

    def user_fk = foreignKey("user_fk", product, products)(_.id)

    def product = column[Long]("product")

    def product_fk = foreignKey("product_fk", product, products)(_.id)

    def * = (user, product) <> ((FavouriteMapping.apply _).tupled, FavouriteMapping.unapply)
  }

  def getFavouritesForUser(userId: Long): Future[Seq[Product]] = {
    val query = for {
      favourite <- favourites if favourite.user === userId
      product <- products if product.id === favourite.product
    } yield product
    db.run(query.result)
  }

  def addFavourite(favourite: FavouriteMapping): Unit = db.run {
    favourites += favourite
  }

  def deleteFavourite(favourite: FavouriteMapping): Future[Unit] = db.run {
    favourites.filter(_.product === favourite.product).delete.map(_ => ())
  }
}
