package models

import play.api.libs.json.{Json, OFormat}

case class Opinion(review: String, stars: Int, product: Long)

object Opinion {
  implicit val opinionFormat: OFormat[Opinion] = Json.format[Opinion]
}