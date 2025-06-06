import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public getAll(): Promise<IUser[]> {
    return userRepository.getAll();
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }

    return user;
  }

  public async updateById(id: string, user: Partial<IUser>): Promise<IUser> {
    const userInDb = await userRepository.getById(id);

    if (!userInDb) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }

    return await userRepository.updateById(id, user);
  }

  public async deleteById(id: string): Promise<void> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }

    await userRepository.deleteById(id);
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);

    if (user) {
      throw new ApiError("User is already exists", StatusCodesEnum.BAD_REQUEST);
    }
  }

  public async roleUpdate(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.BAD_REQUEST);
    }

    if (user.role === RoleEnum.ADMIN) {
      return await userService.updateById(id, { role: RoleEnum.USER });
    }

    return await userService.updateById(id, { role: RoleEnum.ADMIN });
  }
}

export const userService = new UserService();
