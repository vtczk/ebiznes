package models

import play.api.libs.json.{Json, OFormat}

case class Product(id: Long, name: String, description: String, price: Double, image: String, category: Int)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}