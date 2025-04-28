import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader: string = req.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException("Authorization header is missing");

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer")
      throw new UnauthorizedException("Invalid authorization header format");
    if (!token) throw new UnauthorizedException("Token not provided");

    let user: any;
    try {
      user = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error.message);
    }
    if (user.role_id === null) throw new ForbiddenException("You aren't admin");
    req.user = user;
    return true;
  }
}
