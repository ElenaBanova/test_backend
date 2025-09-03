import { IBase } from "./base.interface";

interface IDoctor extends IBase {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
}

interface IDoctorQuery {
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
  order?: string;
}

type IDoctorCreateOrUpdate = Pick<
  IDoctor,
  "name" | "surname" | "phoneNumber" | "email"
>;

export { IDoctor, IDoctorCreateOrUpdate, IDoctorQuery };
