import { Injectable } from '@nestjs/common';
import { IEmailService } from './email.service.interface';

export type SendEmailInput = {
  to: string;
  subject: string;
  content: string;
};

@Injectable()
export class EmailService implements IEmailService {
  public sendEmail(input: SendEmailInput) {
    console.log(`Sending email to ${input.to} with subject ${input.subject}`);
  }
}
