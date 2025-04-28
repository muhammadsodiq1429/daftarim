import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserAuthGuard implements CanActivate {
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

    req.user = user;
    return true;
  }
}
