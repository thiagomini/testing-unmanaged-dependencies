import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { IPasswordService } from '../password.service.interface';

export function createPasswordServiceStub(): DeepMockProxy<IPasswordService> {
  return mockDeep<IPasswordService>();
}

export type PasswordServiceStub = DeepMockProxy<IPasswordService>;
