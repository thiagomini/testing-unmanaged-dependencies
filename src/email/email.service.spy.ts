import { Injectable, Scope } from '@nestjs/common';
import { IEmailService, SendEmailInput } from './email.service.interface';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class EmailServiceSpy implements IEmailService {
  private readonly emailsSent: SendEmailInput[] = [];

  sendEmail(input: SendEmailInput): void {
    console.debug(`Sending email to ${input.to} with subject ${input.subject}`);
    this.emailsSent.push(input);
  }

  shouldHaveSentNumberOfEmails(expected: number) {
    expect(this.emailsSent.length).toBe(expected);
    return this;
  }

  toAddress(email: string) {
    const lastEmail = this.emailsSent.at(-1);
    expect(lastEmail?.to).toEqual(email);
    return this;
  }

  withSubject(subject: string) {
    const lastEmail = this.emailsSent.at(-1);
    expect(lastEmail?.subject).toEqual(subject);
    return this;
  }

  withContent(content: string) {
    const lastEmail = this.emailsSent.at(-1);
    expect(lastEmail?.content).toEqual(expect.stringContaining(content));
    return this;
  }
}
