import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import { MantineProviderWrapper } from "./providers/mantine-provider";
import { ApolloProviderWrapper } from "./providers/apollo-provider";

export const metadata: Metadata = {
  title: "MyApp",
  description: "MyApp Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProviderWrapper>
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </MantineProviderWrapper>
      </body>
    </html>
  );
}
