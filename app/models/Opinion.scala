package models

import play.api.libs.json.{Json, OFormat}

case class Opinion(id: Long, review: String, stars: Int, userName: String, product: Long)

object Opinion {
  implicit val opinionFormat: OFormat[Opinion] = Json.format[Opinion]
}