import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constnts";
import { ActionTokenTypeEnum } from "../enums/ection-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async signUp(
    user: IUserCreateDTO,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const password = await passwordService.hashPassword(user.password);
    const newUser = await userRepository.create({ ...user, password });
    const tokens = tokenService.generateTokens({
      userId: newUser._id,
      role: newUser.role,
    });
    await tokenRepository.create({
      ...tokens,
      _userId: newUser._id,
    });
    const actionToken = tokenService.generateActionToken(
      { userId: newUser._id, role: newUser.role },
      ActionTokenTypeEnum.ACTIVATE,
    );
    await emailService.sendEmail(
      newUser.email,
      emailConstants[EmailEnum.ACTIVATE],
      {
        name: newUser.name,
        url: `${config.FRONTEND_URL}/activate/${actionToken}`,
      },
    );
    return { user: newUser, tokens };
  }

  public async signIn(
    dto: IAuth,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);

    if (!user) {
      throw new ApiError(
        "Invalid email or password",
        StatusCodesEnum.UNAUTHORIZED,
      );
    }
    const isValidPassword = await passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new ApiError(
        "Invalid email or password",
        StatusCodesEnum.UNAUTHORIZED,
      );
    }

    if (!user.isActive) {
      throw new ApiError("Account is not active", StatusCodesEnum.FORBIDDEN);
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async activate(token: string): Promise<IUser> {
    const { userId } = tokenService.verifyToken(
      token,
      ActionTokenTypeEnum.ACTIVATE,
    );
    const user = await userRepository.getById(userId);
    await emailService.sendEmail(
      user.email,
      emailConstants[EmailEnum.WELCOME],
      {
        name: user.name,
      },
    );

    return await userService.updateById(userId, { isActive: true });
  }

  public async recoveryPasswordRequest(user: IUser): Promise<void> {
    const recoveryToken = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.RECOVERY,
    );
    const url = `${config.FRONTEND_URL}/recovery/${recoveryToken}`;
    await emailService.sendEmail(
      user.email,
      emailConstants[EmailEnum.RECOVERY],
      {
        url,
      },
    );
  }

  public async recoveryPassword(
    token: string,
    password: string,
  ): Promise<void> {
    const { userId } = tokenService.verifyToken(
      token,
      ActionTokenTypeEnum.RECOVERY,
    );

    const hashedPassword = await passwordService.hashPassword(password);
    await userService.updateById(userId, {
      password: hashedPassword,
    });
  }
}

export const authService = new AuthService();
