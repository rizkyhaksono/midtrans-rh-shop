"use client"

import { useEffect, useState } from "react"
import { Button, Text } from "@mantine/core"

export default function CartLayout() {
  const [cart, setCart] = useState<{ title: string; price: number; quantity: number }[]>([])

  useEffect(() => {
    const cartData = localStorage.getItem("cart")
    if (cartData) {
      setCart(JSON.parse(cartData))
    } else {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }, [])

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Cart</h1>
        {cart.map((item, index) => (
          <div key={item.title} className="flex justify-between items-center gap-3 text-sm">
            <div>
              <Text>{item.title}</Text>
              <Text size="sm" c={"gray"}>
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.price)}
              </Text>
            </div>
            <div className="flex gap-3 items-center">
              <Button
                size="compact-xs"
                onClick={() => {
                  const newCart = [...cart]
                  newCart[index].quantity--
                  if (newCart[index].quantity === 0) {
                    newCart.splice(index, 1)
                  }
                  localStorage.setItem("cart", JSON.stringify(newCart))
                  setCart(newCart)
                }}
              >
                -
              </Button>
              <Text size="sm">{item.quantity}</Text>
              <Button
                size="compact-xs"
                onClick={() => {
                  const newCart = [...cart]
                  newCart[index].quantity++
                  localStorage.setItem("cart", JSON.stringify(newCart))
                  setCart(newCart)
                }}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          className="mt-4"
          fullWidth
          onClick={() => {
            localStorage.setItem("cart", JSON.stringify([]))
            setCart([])
          }}
        >
          Clear Cart
        </Button>
      </div>
    </>
  )
}
