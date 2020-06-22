package models

import play.api.libs.json.{Json, OFormat}

case class FavouriteMapping(user: String, product: Long)

object FavouriteMapping {
  implicit val favouriteFormat: OFormat[FavouriteMapping] = Json.format[FavouriteMapping]
}
