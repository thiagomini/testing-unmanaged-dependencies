export type SendEmailInput = {
  to: string;
  subject: string;
  content: string;
};

export abstract class IEmailService {
  abstract sendEmail(input: SendEmailInput): void;
}
