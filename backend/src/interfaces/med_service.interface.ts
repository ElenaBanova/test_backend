import { IBase } from "./base.interface";

interface IMedService extends IBase {
  _id: string;
  name: string;
}

interface IMedServiceQuery {
  name?: string;
  order?: string;
}

type IMedServiceCreateDTO = Pick<IMedService, "name">;

export { IMedService, IMedServiceCreateDTO, IMedServiceQuery };
