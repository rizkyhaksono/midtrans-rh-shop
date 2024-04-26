"use client"

import { Card, Image, Text, Badge, Button, Group } from "@mantine/core"
import { useState, useEffect } from "react"

export default function CardUI({ image1, title, price, desc }: Readonly<{ image1: string; title: string; price: number; desc: string }>) {
  const [cart, setCart] = useState<{ title: string; price: number; quantity: number }[]>([])

  useEffect(() => {
    const cartData = localStorage.getItem("cart")
    if (cartData) {
      setCart(JSON.parse(cartData))
    } else {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }, [])

  const addToCart = () => {
    const cartData = localStorage.getItem("cart")
    const cart = JSON.parse(cartData as string)
    const product = cart.find((item: { title: string }) => item.title === title)

    if (product) {
      product.quantity++
    } else {
      cart.push({ title, price, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setCart(cart)
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image1} h={300} alt="Image 1" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {desc}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={addToCart}>
        Add to Cart
      </Button>
    </Card>
  )
}
