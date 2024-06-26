"use client"

import { ActionIcon, AppShell, Burger, Button, Group, Text, useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconMoon, IconSun, IconHome2, IconBox, IconShoppingBag } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const [opened, { toggle }] = useDisclosure()
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true })
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true })

  return (
    <AppShell
      className={computedColorScheme === "light" ? "text-black bg-white" : "text-white bg-[#242424]"}
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 90, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group className="flex justify-between" h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href={"/"}>
            <Image src={"https://rizkyhaksono.natee.my.id/favicon.ico"} alt="Logo" width={30} height={30} />
          </Link>
          <ActionIcon onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")} variant="default" size={30} aria-label="Toggle color scheme">
            {computedColorScheme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="gap-2 w-fit">
        <Button component={Link} href={"/"} variant={pathname === "/" ? "outline" : "default"}>
          <IconHome2 size={15} />
        </Button>
        <Button component={Link} href={"/discover"} variant={pathname === "/discover" ? "outline" : "default"}>
          <IconBox size={15} />
        </Button>
        <Button component={Link} href={"/cart"} variant={pathname === "/cart" ? "outline" : "default"}>
          <IconShoppingBag size={15} />
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer p="md" className="text-center">
        <Text size="sm">
          Build by{" "}
          <Link className="underline underline-offset-4 hover:text-gray-200 transition duration-300" href={"https://github.com/rizkyhaksono"} target="_blank">
            Rizky Haksono
          </Link>
        </Text>
      </AppShell.Footer>
    </AppShell>
  )
}
