package models

import play.api.libs.json._

case class Quantity(product: Long, amount: Long)

object Quantity {
  implicit val quantityFormat = Json.format[Quantity]
}