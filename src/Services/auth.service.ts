
import bcrypt from 'bcrypt'
import Encrypt from '../Utils/bcrypt.encrypt';
import { RegisterInterface} from '../type';
import IUser, {  ILoginRequest, ILoginResponse } from '../Interfaces/user.type';
import AuthRepository from '../Repositories/auth.repository';
import {
    BadRequestError, 
    NotFoundError, 
    UnAuthenticatedError
} from "../Utils/ErrorUtils";
import { createTokenUser } from '../Utils/Middleware/createToken.user';
import sendResetPasswordEmail from '../Utils/Utilities/resetPasswordEmail';
import hashString from '../Utils/Utilities/createHash';
import { sendResetPasswordMail, sendVerificationMail } from '../Utils/Utilities/nodeEmaillogic';
import { TokenRepository } from '../Repositories/token.repository';

export default class AuthService {
  private authRepository = new AuthRepository();
  private tokenRepository = new TokenRepository();
  private encrypt = new Encrypt();

  public async register(payload: RegisterInterface): Promise<IUser> {
    const existingUser = await this.authRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new BadRequestError(`Email ${payload.email} already in use`);
    }
    const hashedPassword = await this.encrypt.bcrypt(payload.password);
    const user = await this.authRepository.create({
      email: payload.email,
      password: hashedPassword,
    });
    await sendVerificationMail({
      email: user.email,
    });
    return user;
  }

  public async verifyEmail(
    verificationToken: string,
    email: string
  ): Promise<void> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnAuthenticatedError(
        `Verification Failed for user with ${email}`
      );
    }
    if (user.verificationCode !== verificationToken) {
      throw new UnAuthenticatedError('Verification Failed');
    }
    user.verified = new Date();
    user.isVerified = true;
    user.verificationCode = '';
    await this.authRepository.saveUser(
      user.isVerified,
      user.verified,
      user.email
    );
  }

  public async login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    const { email, password,  userAgent } = loginRequest;
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }
    const checkPassword = await this.encrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new BadRequestError(`Incorrect ${user.password} password`);
    }
    if (!user.isVerified) {
      throw new UnAuthenticatedError(
        'Please verify your email before logging in'
      );
    }
    const tokenUser = createTokenUser(user);
    let refresh_token = '';
    const existingToken = await this.tokenRepository.findToken(user.id);

    if (existingToken) {
      const { isValid } = existingToken;

      if (!isValid) {
        throw new UnAuthenticatedError('Invalid Credentials');
      }

      refresh_token = existingToken.refresh_token;

      return { id: user.id, tokenUser, refresh_token };
    }

    refresh_token = crypto.randomUUID();
    const userToken = {
      refresh_token,
      userAgent,
      isValid: true,
      userId: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await this.tokenRepository.create(userToken);

    return { id: user.id, tokenUser, refresh_token };
  }

  public async forgotPassword(email: string): Promise<void> {
    if (!email) {
      throw new BadRequestError('Please provide valid email');
    }
    const user = await this.authRepository.findByEmail(email);
    if (user) {
      const passwordToken = crypto.randomUUID();
      const origin = 'http://localhost:3000';
      await sendResetPasswordMail({
        email: user.email,
       
      });
      const tenMInutes = 1000 * 60 * 10;
      const passwordTokenExpirationDate = new Date(Date.now() + tenMInutes);
      await this.authRepository.updateUser(user);
    }
  }
  public async resetPasswordService(
    email: string,
    token: string,
    password: string
  ): Promise<void> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('User not available');
    }

    const currentDate = new Date();

  
      await this.authRepository.updateUser(user);
    }

  public async logout(userId: number): Promise<void> {
    await this.tokenRepository.invalidateTokens(userId);
  }
}
