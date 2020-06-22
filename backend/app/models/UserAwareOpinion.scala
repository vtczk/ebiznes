package models

import play.api.libs.json.{Json, OFormat}

case class UserAwareOpinion(id: Long, review: String, stars: Int, userName: String, product: Long)

object UserAwareOpinion {
  implicit val opinionFormat: OFormat[UserAwareOpinion] = Json.format[UserAwareOpinion]
}