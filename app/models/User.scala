package models

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.{Json, OFormat}

case class User(id: Long, name: String, mail: String, password: String ) extends Identity

object User {
  implicit val userFormat: OFormat[User] = Json.format[User]
}