package services

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService
import models.User

import scala.concurrent.Future

class UserService extends IdentityService[User] {
  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = ???
}
