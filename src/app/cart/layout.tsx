import BaseLayout from "@/components/layout/base-layout"

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <BaseLayout>{children}</BaseLayout>
}
