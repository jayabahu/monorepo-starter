import { Module, Global } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env", "../../.env"],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
