import { Button } from "@mantine/core"
import Link from "next/link"

export default function ThanksPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <h1 className="text-xl font-semibold">Thanks for your purchase! 🎉</h1>
      <p className="text-gray-500">{"We've sent you an email with your order details."}</p>
      <Link href={"/"}>
        <Button color="blue" size="md">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
