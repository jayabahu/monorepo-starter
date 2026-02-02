"use client";

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Title,
  Center,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useAuthGuard } from "@/lib/use-auth-guard";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuthGuard();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/sign-in");
  }

  if (isLoading || !isAuthenticated) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>MyApp</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            label={link.label}
            active={pathname === link.href}
            onClick={() => router.push(link.href)}
          />
        ))}
        <NavLink label="Sign out" onClick={handleSignOut} mt="auto" />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
