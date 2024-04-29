import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  const items = await req.json()

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Invalid item data" }, { status: 400 })
  }

  const secret = process.env.SECRET
  const reqBase64 = Buffer.from(`${secret}:`).toString("base64")

  const itemDetails = items.map(({ id, title, price, quantity }) => ({
    id,
    name: title,
    price: parseFloat(price),
    quantity: parseInt(quantity, 10),
  }))

  const grossAmount = itemDetails.reduce((total, item) => total + item.price * item.quantity, 0)

  const data = {
    item_details: itemDetails,
    transaction_details: {
      order_id: itemDetails.map((item) => item.id).join("-"),
      gross_amount: grossAmount,
    },
  }

  const apiUrl = process.env.NEXT_PUBLIC_API
  if (!apiUrl) {
    throw new Error("API URL is not defined")
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${reqBase64}`,
    },
    body: JSON.stringify(data),
  })

  const paymentLink = await response.json()
  console.log(paymentLink)
  return NextResponse.json(paymentLink)
}
