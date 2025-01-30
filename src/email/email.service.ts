import { Injectable } from '@nestjs/common';

export type SendEmailInput = {
  to: string;
  subject: string;
  content: string;
};

@Injectable()
export class EmailService {
  public sendEmail(input: SendEmailInput) {
    console.log(`Sending email to ${input.to} with subject ${input.subject}`);
  }
}
