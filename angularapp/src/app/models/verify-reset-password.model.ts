export class VerifyResetToken {
    token: string;
    newPassword: string;
    otp: number;
    secretKey: string;
  
    constructor(token: string, newPassword: string, otp: number, secretKey: string) {
      this.token = token;
      this.newPassword = newPassword;
      this.otp = otp;
      this.secretKey = secretKey;
    }
  }
  