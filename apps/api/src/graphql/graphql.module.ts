import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo";
import { join } from "path";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.graphql"),
      sortSchema: true,
      playground: process.env.NODE_ENV !== "production",
      subscriptions: {
        "graphql-ws": true,
      },
      context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
    }),
  ],
})
export class GraphqlModule {}
