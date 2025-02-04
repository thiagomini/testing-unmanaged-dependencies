import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { IEmailService } from './email.service.interface';

@Module({
  providers: [
    {
      provide: IEmailService,
      useClass: EmailService,
    },
  ],
  exports: [IEmailService],
})
export class EmailModule {}
