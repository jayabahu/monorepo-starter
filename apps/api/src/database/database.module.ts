import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { getDb } from "@myapp/database";
import { DATABASE } from "./database.constants";

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: (config: ConfigService) => {
        const url = config.getOrThrow<string>("DATABASE_URL");
        return getDb(url);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
