import Midtrans from "midtrans-client"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req, res) {
  const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
  })

  const { id, title, price, quantity } = await req.json()

  let parameter = {
    item_details: {
      name: title,
      price: price,
      quantity: quantity,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
  }

  const token = await snap.createTransactionToken(parameter)
  return NextResponse.json({ token })
}
