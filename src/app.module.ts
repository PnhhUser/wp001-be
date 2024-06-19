import { Module } from '@nestjs/common';
// import { validate } from '../env.validation';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions, typeOrmAsyncConfig } from 'data/dataSourceOptions';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [configuration],
      envFilePath: [".env.development", ".env.production"],
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UserModule,
    ApiModule
  ]
})
export class AppModule {

}
