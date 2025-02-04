export abstract class IPasswordService {
  abstract isPasswordInRainbowTable(password: string): Promise<boolean>;
}
