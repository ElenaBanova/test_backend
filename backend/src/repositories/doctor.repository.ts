import { FilterQuery } from "mongoose";

import {
  IDoctor,
  IDoctorCreateDTO,
  IDoctorQuery,
  IDoctorUpdate,
} from "../interfaces/doctor.interface";
import { Doctor } from "../models/doctor.model";

class DoctorRepository {
  public getAll(query: IDoctorQuery): Promise<IDoctor[]> {
    if (!query) {
      return Doctor.find();
    }

    const filterObject: FilterQuery<IDoctor> = {};

    if (query.name) {
      filterObject.name = { $regex: query.name, $options: "i" };
    }
    if (query.surname) {
      filterObject.surname = { $regex: query.surname, $options: "i" };
    }
    if (query.phoneNumber) {
      filterObject.phoneNumber = { $regex: query.phoneNumber, $options: "i" };
    }
    if (query.email) {
      filterObject.email = { $regex: query.email, $options: "i" };
    }

    return Doctor.find(filterObject).sort(query.order);
  }

  public create(doctor: IDoctorCreateDTO): Promise<IDoctor> {
    return Doctor.create(doctor);
  }

  public updateById(id: string, doctor: IDoctorUpdate): Promise<IDoctor> {
    return Doctor.findByIdAndUpdate(id, doctor, { new: true });
  }

  public getById(id: string): Promise<IDoctor> {
    return Doctor.findById(id);
  }

  public deleteById(id: string): Promise<void> {
    return Doctor.findByIdAndDelete(id);
  }
}

export const doctorRepository = new DoctorRepository();
