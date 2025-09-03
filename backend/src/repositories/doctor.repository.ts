import { FilterQuery } from "mongoose";

import {
  IDoctor,
  IDoctorCreateOrUpdate,
  IDoctorQuery,
} from "../interfaces/doctor.interface";
import { IDoctorGen } from "../interfaces/IDoctorGen.interface";
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

  public getAllGen(query: IDoctorQuery): Promise<IDoctorGen[]> {
    const filterObjectGen: FilterQuery<IDoctor> = {};

    if (query.name) {
      filterObjectGen.name = { $regex: query.name, $options: "i" };
    }
    if (query.surname) {
      filterObjectGen.surname = { $regex: query.surname, $options: "i" };
    }
    if (query.phoneNumber) {
      filterObjectGen.phoneNumber = {
        $regex: query.phoneNumber,
        $options: "i",
      };
    }
    if (query.email) {
      filterObjectGen.email = { $regex: query.email, $options: "i" };
    }

    const orderObject = {};
    if (query.order) {
      if (query.order.startsWith("-")) {
        orderObject[query.order.slice(1)] = -1;
      } else {
        orderObject[query.order] = 1;
      }
    }

    return Doctor.aggregate([
      {
        $match: filterObjectGen,
      },
      {
        $sort: orderObject,
      },
      {
        $lookup: {
          from: "complexes",
          localField: "_id",
          foreignField: "_doctorId",
          as: "doctor",
        },
      },
      {
        $lookup: {
          from: "clinics",
          localField: "doctor._clinicId",
          foreignField: "_id",
          as: "clinics",
        },
      },
      {
        $lookup: {
          from: "medservices",
          localField: "doctor._medServiceId",
          foreignField: "_id",
          as: "med_Services",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          surname: 1,
          phoneNumber: 1,
          email: 1,
          clinics: {
            $map: {
              input: "$clinics",
              as: "c",
              in: {
                name: "$$c.name",
                med_Services: {
                  $map: {
                    input: "$med_Services",
                    as: "m",
                    in: "$$m.name",
                  },
                },
              },
            },
          },
        },
      },
    ]);
  }

  public create(doctor: IDoctorCreateOrUpdate): Promise<IDoctor> {
    return Doctor.create(doctor);
  }

  public updateById(
    id: string,
    doctor: IDoctorCreateOrUpdate,
  ): Promise<IDoctor> {
    return Doctor.findByIdAndUpdate(id, doctor, { new: true });
  }

  public getById(id: string): Promise<IDoctor> {
    return Doctor.findById(id);
  }

  public deleteById(id: string): Promise<void> {
    return Doctor.findByIdAndDelete(id);
  }

  public getByOne(key: string, value: string): Promise<IDoctor> {
    return Doctor.findOne({ [key]: value });
  }
}

export const doctorRepository = new DoctorRepository();
