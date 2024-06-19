import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from 'src/user/user.module';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  imports: [UserModule],
  providers: [ApiService]
})
export class ApiModule { }
