"use client"

import { useState } from "react"

export default function useNotification() {
  const [showNotification, setShowNotification] = useState(false)

  const handleNotification = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  return { showNotification, handleNotification }
}
