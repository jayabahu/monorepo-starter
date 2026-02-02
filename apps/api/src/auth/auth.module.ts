import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createAuth } from "@myapp/auth";
import { DATABASE } from "../database/database.constants";
import { AUTH } from "./auth.constants";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH,
      useFactory: (config: ConfigService, db: any) => {
        return createAuth({
          db,
          secret: config.getOrThrow<string>("BETTER_AUTH_SECRET"),
          baseURL: config.getOrThrow<string>("BETTER_AUTH_URL"),
          trustedOrigins: [
            config.get<string>("CORS_ORIGIN") ?? "http://localhost:3000",
          ],
        });
      },
      inject: [ConfigService, DATABASE],
    },
    AuthGuard,
  ],
  exports: [AUTH, AuthGuard],
})
export class AuthModule {}
