import { IBase } from "./base.interface";

interface IClinic extends IBase {
  _id: string;
  name: string;
}

interface IClinicQuery {
  name?: string;
  order?: string;
}

type IClinicCreateDTO = Pick<IClinic, "name">;

export { IClinic, IClinicCreateDTO, IClinicQuery };
