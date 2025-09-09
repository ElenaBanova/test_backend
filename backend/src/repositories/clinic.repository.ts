import { FilterQuery } from "mongoose";

import {
  IClinic,
  IClinicCreateDTO,
  IClinicQuery,
} from "../interfaces/clinic.interface";
import { IDoctor } from "../interfaces/doctor.interface";
import { IClinicGen } from "../interfaces/IClinicGen.interface";
import { IMedService } from "../interfaces/med_service.interface";
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

    const doctorFilterObject: FilterQuery<IDoctor> = {};

    if (query.doctorName) {
      doctorFilterObject["doctor.name"] = {
        $regex: query.doctorName,
        $options: "i",
      };
    }
    if (query.doctorSurname) {
      doctorFilterObject["doctor.surname"] = {
        $regex: query.doctorSurname,
        $options: "i",
      };
    }
    if (query.phoneNumber) {
      doctorFilterObject["doctor.phoneNumber"] = {
        $regex: query.phoneNumber,
        $options: "i",
      };
    }
    if (query.email) {
      doctorFilterObject["doctor.email"] = {
        $regex: query.email,
        $options: "i",
      };
    }

    const medServiceFilterObject: FilterQuery<IMedService> = {};

    if (query.medService) {
      medServiceFilterObject["medService.name"] = {
        $regex: query.medService,
        $options: "i",
      };
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
        $lookup: {
          from: "complexes",
          localField: "_id",
          foreignField: "_clinicId",
          as: "complexes",
        },
      },
      { $unwind: "$complexes" },
      {
        $lookup: {
          from: "doctors",
          localField: "complexes._doctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      {
        $lookup: {
          from: "medservices",
          localField: "complexes._medServiceId",
          foreignField: "_id",
          as: "medService",
        },
      },
      { $unwind: "$medService" },
      {
        $match: {
          ...doctorFilterObject,
          ...medServiceFilterObject,
        },
      },
      // {
      //   $match: {
      //     ...(Object.keys(doctorFilterObject).length
      //       ? [
      //           { "doctor.name": doctorFilterObject.name },
      //           { "doctor.surname": doctorFilterObject.surname },
      //           { "doctor.phoneNumber": doctorFilterObject.phoneNumber },
      //           { "doctor.email": doctorFilterObject.email },
      //         ]
      //       : []),
      //     ...(Object.keys(medServiceFilterObject).length
      //       ? [{ "medService.name": medServiceFilterObject.name }]
      //       : []),
      //   },
      // },
      {
        $group: {
          clinicName: { $first: "$name" },
          _id: {
            clinicId: "$_id",
            doctorId: "$doctor._id",
            doctorName: "$doctor.name",
            doctorSurname: "$doctor.surname",
            phoneNumber: "$doctor.phoneNumber",
            email: "$doctor.email",
          },
          medServices: { $addToSet: "$medService.name" },
        },
      },
      {
        $group: {
          _id: "$_id.clinicId",
          clinicName: { $first: "$clinicName" },
          doctors: {
            $push: {
              name: "$_id.doctorName",
              surname: "$_id.doctorSurname",
              phoneNumber: "$_id.phoneNumber",
              email: "$_id.email",
              med_Services: "$medServices",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$clinicName",
          doctors: 1,
        },
      },
      {
        $sort: orderObject,
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

  public getByName(name: string): Promise<IClinic> {
    return Clinic.findOne({ name });
  }
}

export const clinicRepository = new ClinicRepository();
