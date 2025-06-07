import { FilterQuery } from "mongoose";

import {
  IDoctor,
  IDoctorCreateDTO,
  IDoctorQuery,
  IDoctorUpdate,
} from "../interfaces/doctor.interface";
import { IDoctorGen } from "../interfaces/IDoctorGen";
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
          from: "clinics",
          localField: "_clinicId",
          foreignField: "_id",
          as: "clinicInfo",
        },
      },
      {
        $unwind: "$clinicInfo",
      },
      {
        $lookup: {
          from: "medservices",
          localField: "_id",
          foreignField: "_doctorId",
          as: "med_ServiceInfo",
        },
      },
      {
        $project: {
          _id: 0,
          _clinicId: 0,
          createdAt: 0,
          updatedAt: 0,
          "clinicInfo._id": 0,
          "clinicInfo.createdAt": 0,
          "clinicInfo.updatedAt": 0,
          "med_ServiceInfo._id": 0,
          "med_ServiceInfo._doctorId": 0,
          "med_ServiceInfo.createdAt": 0,
          "med_ServiceInfo.updatedAt": 0,
        },
      },
    ]);
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
