import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from '../../config/app.config';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          try {
            const secretToken = request.headers.cookie.split('; ');
            let result = {};
            secretToken.forEach((item) => {
              const temp = item.split('=');
              result[temp[0]] = temp[1];
            });
            return result['nextauth.token'];
          } catch (error) {
            return error;
          }
        },
      ]),
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}
