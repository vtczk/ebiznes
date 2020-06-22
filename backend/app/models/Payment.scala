package models

import play.api.libs.json._

case class Payment(id: Long, userId: Long, amount: String)

object Payment {
  implicit val paymentFormat = Json.format[Payment]
}