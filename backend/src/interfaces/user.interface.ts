import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IUser extends IBase {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: RoleEnum;
  isActive: boolean;
}

type IUserCreateDTO = Pick<IUser, "name" | "surname" | "email" | "password">;
type IUserUpdateDTO = Pick<IUser, "name" | "surname">;

export { IUser, IUserCreateDTO, IUserUpdateDTO };
