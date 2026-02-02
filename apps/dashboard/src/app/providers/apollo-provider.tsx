"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { getApolloClient } from "@/lib/apollo";

export function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getApolloClient();
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
