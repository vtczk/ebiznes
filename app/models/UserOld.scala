package models

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.{Json, OFormat}

case class UserOld(id: Long, name: String, mail: String, password: String ) extends Identity

object UserOld {
  implicit val userFormat: OFormat[UserOld] = Json.format[UserOld]
}