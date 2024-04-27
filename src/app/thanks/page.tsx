import { Button, Text } from "@mantine/core"
import Link from "next/link"

export default function ThanksPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Text size="xl" fw={700}>
        Thanks for your purchase! 🎉
      </Text>
      <Text c={"gray"} size="md">
        {"We've sent you an email with your order details."}
      </Text>
      <Link href={"/"}>
        <Button color="blue" size="md">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
