import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly emailService: EmailService) {}

  @Post('signup')
  signup(@Body() input: { email: string; password: string }) {
    this.emailService.sendEmail({
      to: input.email,
      subject: 'Welcome!',
      content: 'Welcome to our app!',
    });
    return {
      accessToken: 'a.jwt.token',
    };
  }
}
