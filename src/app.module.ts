import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
