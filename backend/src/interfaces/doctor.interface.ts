import { IBase } from "./base.interface";

interface IDoctor extends IBase {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  _clinicId: string;
}

interface IDoctorQuery {
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
  order?: string;
}

type IDoctorCreateDTO = Pick<
  IDoctor,
  "name" | "surname" | "phoneNumber" | "email" | "_clinicId"
>;

type IDoctorUpdate = Pick<
  IDoctor,
  "name" | "surname" | "phoneNumber" | "email"
>;

export { IDoctor, IDoctorCreateDTO, IDoctorQuery, IDoctorUpdate };
