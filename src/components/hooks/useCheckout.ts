"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface Item {
  title: string
  price: number
  quantity: number
}

function useCheckout({ items }: { items: [Item] }) {
  useEffect(() => {
    const snapMidtrans = process.env.NEXT_PUBLIC_SNAP ?? ""
    const clientKey = process.env.NEXT_PUBLIC_CLIENT ?? ""

    const script = document.createElement("script")
    script.src = snapMidtrans
    script.setAttribute("data-client-key", clientKey)
    script.async = true

    document.body.appendChild(script)

    console.log(items)
    console.log("snap script added")
    return () => {
      document.body.removeChild(script)
    }
  }, [items])
}

async function useToken({ items }: { items: [Item] }) {
  const router = useRouter()

  const data = [
    items.map((item) => ({
      id: item.title,
      price: item.price,
      quantity: item.quantity,
      name: item.title,
    })),
  ]

  const request = await fetch("/api/token", {
    method: "POST",
    body: JSON.stringify(data),
  })

  const response = await request.json()

  // @ts-ignore
  window.snap.pay(response.token, {
    onSuccess: function (result: any) {
      console.log("success")
      router.push("/success")
    },
    onPending: function (result: any) {
      console.log("pending")
      router.push("/pending")
    },
    onError: function (result: any) {
      console.log("error")
      router.push("/error")
    },
  })

  return request
}

async function usePayment({ items }: { items: [Item] }) {
  const router = useRouter()

  const data = [
    items.map((item) => ({
      id: item.title,
      price: item.price,
      quantity: item.quantity,
      name: item.title,
    })),
  ]

  const request = await fetch("/api/payment", {
    method: "POST",
    body: JSON.stringify(data),
  })

  const response = await request.json()

  if (response.status === "success") {
    router.push(response.url)
  }
}

export { useCheckout, useToken, usePayment }
