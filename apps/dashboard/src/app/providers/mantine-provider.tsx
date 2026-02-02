"use client";

import { MantineProvider as BaseMantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "system-ui, -apple-system, sans-serif",
});

export function MantineProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </BaseMantineProvider>
  );
}
