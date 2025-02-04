import { Injectable, Logger } from '@nestjs/common';
import { IEmailService } from './email.service.interface';

export type SendEmailInput = {
  to: string;
  subject: string;
  content: string;
};

@Injectable()
export class EmailService implements IEmailService {
  private readonly logger = new Logger(EmailService.name);

  public sendEmail(input: SendEmailInput) {
    this.logger.log(
      `Sending email to ${input.to} with subject ${input.subject}`,
    );
  }
}
