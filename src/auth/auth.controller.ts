import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { IEmailService } from '../email/email.service.interface';
import { IPasswordService } from './password.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailService: IEmailService,
    private readonly passwordService: IPasswordService,
  ) {}

  @Post('signup')
  async signup(@Body() input: { email: string; password: string }) {
    const isPasswordInRainbowTable =
      await this.passwordService.isPasswordInRainbowTable(input.password);

    if (isPasswordInRainbowTable) {
      throw new BadRequestException({
        title: 'Bad Request',
        detail:
          'Your password has leaked in a data breach. Please choose a different one.',
      });
    }

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
