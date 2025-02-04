import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { AuthController } from './auth.controller';
import { IPasswordService } from './password.service.interface';
import { PasswordService } from './password.service';

@Module({
  imports: [EmailModule],
  providers: [{ provide: IPasswordService, useClass: PasswordService }],
  controllers: [AuthController],
})
export class AuthModule {}
