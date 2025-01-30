export type SendEmailInput = {
  to: string;
  subject: string;
  content: string;
};

export interface IEmailService {
  sendEmail(input: SendEmailInput): void;
}
