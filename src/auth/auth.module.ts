import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';
import { JwtAuthGaurd } from './jwt.guard';
import { ApiKeyStrategy } from './apiKey.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, JwtAuthGaurd, ApiKeyStrategy],
  imports: [UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('secret'),
          signOptions: {
            expiresIn: "1d"
          }
        }
      },

    }),
  ]
})
export class AuthModule { }
