import { All, Controller, Req, Res, Inject } from "@nestjs/common";
import type { Request, Response } from "express";
import { AUTH } from "./auth.constants";
import type { Auth } from "@myapp/auth";
import { toNodeHandler } from "better-auth/node";

@Controller("api/auth")
export class AuthController {
  private handler: ReturnType<typeof toNodeHandler>;

  constructor(@Inject(AUTH) auth: Auth) {
    this.handler = toNodeHandler(auth);
  }

  @All("*path")
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    this.handler(req, res);
  }
}
