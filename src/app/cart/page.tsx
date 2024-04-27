"use client"

import { Button, Text, Container } from "@mantine/core"
import useCart from "@/components/hooks/useCart"

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart()

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

      <div className="flex justify-center">
        {cart.length > 0 ? (
          <Button
            className="mt-4"
            fullWidth
            onClick={() => {
              localStorage.setItem("cart", JSON.stringify([]))
            }}
          >
            Clear Cart
          </Button>
        ) : (
          <Text size="md">No Items</Text>
        )}
      </div>
    </Container>
  )
}
