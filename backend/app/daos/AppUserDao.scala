package daos

import com.mohiva.play.silhouette.api.LoginInfo
import models.{UserIdentity, UserOld}

import scala.concurrent.Future

trait AppUserDao {
  def save(user: UserIdentity): Future[UserIdentity]

  def update(user: UserIdentity): Future[UserIdentity]

  def find(loginInfo: LoginInfo): Future[Option[UserIdentity]]
}
