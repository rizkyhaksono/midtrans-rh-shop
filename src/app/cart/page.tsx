"use client"

import { Button, Text, Container } from "@mantine/core"
import useCart from "@/components/hooks/useCart"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const { cart, addToCart, removeFromCart } = useCart()

  console.log(JSON.stringify(cart))

  // hanndle purchase now
  const handlePurchase = async () => {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    })

    const data = await response.json()
    console.log(data)
    router.push(data.redirect_url)
    localStorage.setItem("cart", JSON.stringify([]))
  }

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <Text size="xl" fw={700}>
          Cart List
        </Text>
        {cart.map((item) => (
          <div key={item.title} className="flex justify-between items-center gap-3 text-sm">
            <div>
              <Text>{item.title}</Text>
              <Text size="sm" c={"gray"}>
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.price)}
              </Text>
            </div>
            <div className="flex gap-3 items-center">
              <Button size="compact-xs" onClick={() => removeFromCart(item)}>
                -
              </Button>
              <Text size="sm">{item.quantity}</Text>
              <Button size="compact-xs" onClick={() => addToCart(item)}>
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5 mt-5">
        {cart.length > 0 ? (
          <>
            <Button
              className="mt-4"
              fullWidth
              color="red"
              variant="filled"
              onClick={() => {
                localStorage.setItem("cart", JSON.stringify([]))
              }}
            >
              Clear Cart
            </Button>
            <Button className="mt-4" fullWidth color="blue" variant="filled" onClick={handlePurchase}>
              Purchase Now
            </Button>
          </>
        ) : (
          <Text size="md">No Items</Text>
        )}
      </div>
    </Container>
  )
}
