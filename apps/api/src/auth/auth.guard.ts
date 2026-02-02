import type {
  CanActivate,
  ExecutionContext} from "@nestjs/common";
import {
  Injectable,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AUTH } from "./auth.constants";
import type { Auth } from "@myapp/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH) private readonly auth: Auth) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req) {
      throw new UnauthorizedException("No request context");
    }

    const session = await this.auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      throw new UnauthorizedException("Invalid session");
    }

    req.user = session.user;
    req.session = session.session;
    return true;
  }
}
