import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You! | RH Shop",
  description: "Generated by @rizkyhaksono",
}

export default function ThanksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="container mx-auto">{children}</div>
}
