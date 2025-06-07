import { FilterQuery } from "mongoose";

import {
  IClinic,
  IClinicCreateDTO,
  IClinicQuery,
} from "../interfaces/clinic.interface";
import { IClinicGen } from "../interfaces/IClinicGen";
import { Clinic } from "../models/clinic.models";

class ClinicRepository {
  public getAll(query: IClinicQuery): Promise<IClinic[]> {
    const filterObject: FilterQuery<IClinic> = {};

    if (query.name) {
      filterObject.name = { $regex: query.name, $options: "i" };
    }

    return Clinic.find(filterObject).sort(query.order);
  }

  public getAllGen(query: IClinicQuery): Promise<IClinicGen[]> {
    const filterObject: FilterQuery<IClinic> = {};
    if (query.name) {
      filterObject.name = { $regex: query.name, $options: "i" };
    }

    const orderObject = {};
    if (query.order) {
      if (query.order.startsWith("-")) {
        orderObject[query.order.slice(1)] = -1;
      } else {
        orderObject[query.order] = 1;
      }
    }

    return Clinic.aggregate([
      {
        $match: filterObject,
      },
      {
        $sort: orderObject,
      },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "_clinicId",
          as: "doctorInfo",
        },
      },
      {
        $lookup: {
          from: "medservices",
          localField: "doctorInfo._id",
          foreignField: "_doctorId",
          as: "med_ServiceInfo",
        },
      },
      {
        $unwind: "$doctorInfo",
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          "doctorInfo._id": 0,
          "doctorInfo._clinicId": 0,
          "doctorInfo.createdAt": 0,
          "doctorInfo.updatedAt": 0,
          "med_ServiceInfo._id": 0,
          "med_ServiceInfo.createdAt": 0,
          "med_ServiceInfo.updatedAt": 0,
        },
      },
    ]);
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
