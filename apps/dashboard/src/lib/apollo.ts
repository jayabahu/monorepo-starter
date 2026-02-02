import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL ?? "http://localhost:4000/graphql",
    credentials: "include",
  });

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url:
              process.env.NEXT_PUBLIC_API_WS_URL ?? "ws://localhost:4000/graphql",
          }),
        )
      : null;

  const link =
    typeof window !== "undefined" && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink,
          httpLink,
        )
      : httpLink;

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}

let apolloClient: ApolloClient | null = null;

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = makeClient();
  }
  return apolloClient;
}
