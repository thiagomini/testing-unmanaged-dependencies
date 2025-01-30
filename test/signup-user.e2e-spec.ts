import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { mockDeep } from 'jest-mock-extended';
import { EmailService } from '../src/email/email.service';

describe('SignUp user (e2e)', () => {
  let testingApp: INestApplication<App>;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailService)
      .useFactory({
        factory: () => mockDeep<EmailService>(),
      })
      .compile();

    testingApp = testingModule.createNestApplication();
    await testingApp.init();
  });

  test('create a new user and sends a confirmation email', async () => {
    const server = testingApp.getHttpServer();
    const response = await request(server).post('/auth/signup').send({
      email: 'new-user@mail.com',
      password: 'password',
    });

    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    expect(response.body).toHaveProperty(
      'accessToken',
      expect.stringMatching(jwtRegex),
    );

    // how do we test an email was sent?
    const mockedEmailService = testingApp.get(EmailService);
    expect(mockedEmailService.sendEmail).toHaveBeenCalledWith({
      to: 'new-user@mail.com',
      subject: 'Welcome!',
      content: expect.stringContaining('Welcome to our app!'),
    });
  });
});
