import { Injectable, Logger } from '@nestjs/common';
import { IPasswordService } from './password.service.interface';

@Injectable()
export class PasswordService implements IPasswordService {
  private readonly logger = new Logger(PasswordService.name);

  isPasswordInRainbowTable(password: string): Promise<boolean> {
    this.logger.log(`Checking if password is in rainbow table: ${password}`);
    return Promise.resolve(false);
  }
}
