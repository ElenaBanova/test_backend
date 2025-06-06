import { FilterQuery } from "mongoose";

import {
  IClinic,
  IClinicCreateDTO,
  IClinicQuery,
} from "../interfaces/clinic.interface";
import { Clinic } from "../models/clinic.models";

class ClinicRepository {
  public getAll(query: IClinicQuery): Promise<IClinic[]> {
    const filterObject: FilterQuery<IClinic> = {};

    if (query.name) {
      filterObject.name = { $regex: query.name, $options: "i" };
    }

    return Clinic.find(filterObject).sort(query.order);
  }

  public create(clinic: IClinicCreateDTO): Promise<IClinic> {
    return Clinic.create(clinic);
  }

  public updateById(id: string, clinic: IClinicCreateDTO): Promise<IClinic> {
    return Clinic.findByIdAndUpdate(id, clinic, { new: true });
  }

  public getById(id: string): Promise<IClinic> {
    return Clinic.findById(id);
  }

  public deleteById(id: string): Promise<void> {
    return Clinic.findByIdAndDelete(id);
  }
}

export const clinicRepository = new ClinicRepository();
