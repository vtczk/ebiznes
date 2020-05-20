package models

import play.api.libs.json._

case class TopDeal(id: Long, discount: Long, product: Long)

object TopDeal {
  implicit val topDealFormat: OFormat[TopDeal] = Json.format[TopDeal]
}