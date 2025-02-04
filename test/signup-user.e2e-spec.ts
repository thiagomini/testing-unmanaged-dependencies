import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { IPasswordService } from '../src/auth/password.service.interface';
import {
  createPasswordServiceStub,
  PasswordServiceStub,
} from '../src/auth/password.service.stub';
import { IEmailService } from '../src/email/email.service.interface';
import { EmailServiceSpy } from '../src/email/email.service.spy';

describe('SignUp user (e2e)', () => {
  let testingApp: INestApplication<App>;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IEmailService)
      .useClass(EmailServiceSpy)
      .overrideProvider(IPasswordService)
      .useFactory({
        factory: createPasswordServiceStub,
      })
      .compile();

    testingApp = testingModule.createNestApplication();
    await testingApp.init();
  });

  test('create a new user and sends a confirmation email', async () => {
    // Arrange
    const server = testingApp.getHttpServer();

    // Act
    const response = await request(server).post('/auth/signup').send({
      email: 'new-user@mail.com',
      password: 'password',
    });

    // Assert
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    expect(response.body).toHaveProperty(
      'accessToken',
      expect.stringMatching(jwtRegex),
    );

    const emailServiceSpy = testingApp.get<EmailServiceSpy>(IEmailService);
    emailServiceSpy
      .shouldHaveSentNumberOfEmails(1)
      .toAddress('new-user@mail.com')
      .withSubject('Welcome!')
      .withContent('Welcome to our app!');
  });

  test('returns an error when password hash is in a rainbow table', async () => {
    // Arrange
    const server = testingApp.getHttpServer();
    const passwordServiceStub =
      testingApp.get<PasswordServiceStub>(IPasswordService);
    passwordServiceStub.isPasswordInRainbowTable.mockResolvedValueOnce(true);

    // Act
    const response = await request(server).post('/auth/signup').send({
      email: 'new-user@mail.com',
      password: 'password',
    });

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      title: 'Bad Request',
      detail:
        'Your password has leaked in a data breach. Please choose a different one.',
    });
  });
});
