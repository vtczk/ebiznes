package repositories

import javax.inject.{Inject, Singleton}
import models.{Product, Quantity}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._


  class ProductTable(tag: Tag) extends Table[Product](tag, "product") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    /** The name column */
    def name = column[String]("name")

    /** The age column */
    def description = column[String]("description")

    def price = column[Double]("price")

    def image = column[String]("image")

    def category = column[Int]("category")

    def category_fk = foreignKey("cat_fk", category, cat)(_.id)


    /**
      * This is the tables default "projection".
      *
      * It defines how the columns are converted to and from the Person object.
      *
      * In this case, we are simply passing the id, name and page parameters to the Person case classes
      * apply and unapply methods.
      */
    def * = (id, name, description, price, image, category) <> ((Product.apply _).tupled, Product.unapply)

  }

  class QuantityTable(tag: Tag) extends Table[Quantity](tag, "quantity") {

    def product = column[Long]("product", O.PrimaryKey, O.AutoInc)

    def product_fk = foreignKey("product_fk", product, products)(_.id)

    def amount = column[Long]("amount")

    def * = (product, amount) <> ((Quantity.apply _).tupled, Quantity.unapply)
  }

  import categoryRepository.CategoryTable

  private val products = TableQuery[ProductTable]

  private val cat = TableQuery[CategoryTable]

  private val quantities = TableQuery[QuantityTable]

  /**
    * List all the people in the database.
    */
  def getAll(): Future[Seq[Product]] = db.run {
    products.result
  }

  def addProduct(newProduct: Product): Future[Product] = db.run {
    products returning products.map(_.id) into ((newProduct, id) => newProduct.copy(id = id)) += (newProduct)
  }


  def getByCategory(category_id: Int): Future[Seq[Product]] = db.run {
    products.filter(_.category === category_id).result
  }

  def getById(id: Long): Future[Product] = db.run {
    products.filter(_.id === id).result.head
  }

  def delete(id: Long): Future[Unit] = db.run(products.filter(_.id === id).delete).map(_ => ())

  def update(newProduct: Product): Future[Unit] = {
    db.run(products.filter(_.id === newProduct.id).update(newProduct)).map(_ => ())
  }

  def updateQuantity(quantity: Quantity): Unit = {
    val q = for {q <- quantities if q.product === quantity.product} yield q.amount
    db.run(q.update(quantity.amount))
  }

  def setQuantity(productId: Long, amount: Long): Future[Unit] = {

    val quantity = Quantity(productId, amount)
    val isPresent: Future[Option[Quantity]] = db.run(quantities.filter(_.product === productId).result.headOption)
    val result = isPresent.map {
      case Some(q) =>
        updateQuantity(quantity)
      case None =>
        addQuantity(quantity)
    }
    result
  }

  def addQuantity(quantity: Quantity): Unit = db.run {
    quantities += quantity
  }

  def getQuantity(productId: Long): Future[Option[Long]] = {
    val getAmount = for {q <- quantities if q.product === productId} yield q.amount
    db.run(getAmount.result.headOption)
  }

  def decreaseQuantity(productId: Long, amount: Long): Unit = {
    val isPresent: Future[Quantity] = db.run(quantities.filter(_.product === productId).result.head)
    val result = isPresent.map(q => {
      var diff = q.amount - amount
      if (diff < 0)
        diff = 0
      updateQuantity(Quantity(productId, diff))
    })
    result
  }

  def searchForProduct(phrase: String): Future[Option[Product]] = {

    val q = for {product <- products if product.name like '%' + phrase + "%"

    } yield product

    db.run(q.result.headOption)
  }
}