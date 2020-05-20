package repositories

import com.google.inject.Inject
import javax.inject.Singleton
import models.{Product, User}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class UserRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  val users = TableQuery[UserTable]

  class UserTable(tag: Tag) extends Table[User](tag, "user") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def mail = column[String]("mail")

    def password = column[String]("password")

    def * = (id, name, mail, password) <> ((User.apply _).tupled, User.unapply)
  }

  def add(user: User): Future[User] = db.run {
    users returning users.map(_.id) into ((user, id) => user.copy(id = id)) += user
  }

  def isPresent(user: User): Future[Option[User]] = db.run {
    users.filter(usr => usr.name === user.name &&
      usr.mail === user.mail &&
      usr.password === user.password
    ).result.headOption
  }

}