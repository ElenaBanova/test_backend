import { IBase } from "./base.interface";

interface IMedService extends IBase {
  _id: string;
  name: string;
  _doctorId: string;
}

interface IMedServiceQuery {
  name?: string;
  order?: string;
}

type IMedServiceCreateDTO = Pick<IMedService, "name" | "_doctorId">;

export { IMedService, IMedServiceCreateDTO, IMedServiceQuery };
