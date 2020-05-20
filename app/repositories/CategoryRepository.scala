package repositories

import javax.inject.{Inject, Singleton}
import models.Category
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CategoryRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CategoryTable(tag: Tag) extends Table[Category](tag, "category") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def * = (id, name) <> ((Category.apply _).tupled, Category.unapply)
  }

  private val category = TableQuery[CategoryTable]

  def add(name: String): Future[Category] = db.run {
    (category.map(c => c.name)
      returning category.map(_.id)
      into ((name, id) => Category(id, name))
      ) += name
  }

  def getAll(): Future[Seq[Category]] = db.run {
    category.result
  }

  def update(updatedCategory: Category): Future[Unit] = {
    db.run(category.filter(_.id === updatedCategory.id).update(updatedCategory)).map(_ => ())
  }

  def delete(id: Int): Future[Unit] = db.run(category.filter(_.id === id).delete).map(_ => ())
}