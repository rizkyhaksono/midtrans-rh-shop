"use client"

import { useEffect, useState } from "react"

function useCart() {
  const [cart, setCart] = useState<{ title: string; price: number; quantity: number }[]>([])

  useEffect(() => {
    const cartData = localStorage.getItem("cart")
    if (cartData) {
      setCart(JSON.parse(cartData))
    } else {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }, [])

  const addToCart = (itemToAdd: { title: string; price: number; quantity: number }) => {
    const updatedCart = [...cart]
    const existingItemIndex = updatedCart.findIndex((item) => item.title === itemToAdd.title)

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity++
    } else {
      updatedCart.push(itemToAdd)
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const removeFromCart = (itemToRemove: { title: string; price: number; quantity: number }) => {
    const updatedCart = [...cart]
    const existingItemIndex = updatedCart.findIndex((item) => item.title === itemToRemove.title)

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity--
      if (updatedCart[existingItemIndex].quantity === 0) {
        updatedCart.splice(existingItemIndex, 1)
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      setCart(updatedCart)
    }
  }

  return { cart, addToCart, removeFromCart }
}

export default useCart
