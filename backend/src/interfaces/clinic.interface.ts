import { IBase } from "./base.interface";

interface IClinic extends IBase {
  _id: string;
  name: string;
}

interface IClinicQuery {
  name?: string;
  doctorName?: string;
  doctorSurname?: string;
  phoneNumber?: string;
  email?: string;
  medService?: string;
  order?: string;
}

type IClinicCreateDTO = Pick<IClinic, "name">;

export { IClinic, IClinicCreateDTO, IClinicQuery };
