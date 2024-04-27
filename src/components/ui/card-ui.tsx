"use client"

import { Card, Image, Text, Badge, Button, Group, Container } from "@mantine/core"
import useCart from "../hooks/useCart"

export default function CardUI({ image1, title, price, desc }: Readonly<{ image1: string; title: string; price: number; desc: string }>) {
  const { addToCart } = useCart()

  return (
    <Container>
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

        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => {
            addToCart({ title, price, quantity: 1 })
          }}
        >
          Add to Cart
        </Button>
      </Card>
    </Container>
  )
}
