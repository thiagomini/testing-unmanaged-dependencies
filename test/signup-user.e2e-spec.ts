import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { EmailService } from '../src/email/email.service';
import { EmailServiceSpy } from '../src/email/email.service.spy';

describe('SignUp user (e2e)', () => {
  let testingApp: INestApplication<App>;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailService)
      .useClass(EmailServiceSpy)
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

    const emailServiceSpy = testingApp.get<EmailServiceSpy>(EmailService);
    emailServiceSpy
      .shouldHaveSentNumberOfEmails(1)
      .toAddress('new-user@mail.com')
      .withSubject('Welcome!')
      .withContent('Welcome to our app!');
  });
});
