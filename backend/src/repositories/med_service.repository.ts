import { FilterQuery } from "mongoose";

import { IMedServiceGen } from "../interfaces/IMedServiceGen.interface";
import {
  IMedService,
  IMedServiceCreateDTO,
  IMedServiceQuery,
} from "../interfaces/med_service.interface";
import { MedService } from "../models/med_service.model";

class MedServiceRepository {
  public getAll(query: IMedServiceQuery): Promise<IMedService[]> {
    const filterObject: FilterQuery<IMedService> = {};

    if (query.name) {
      filterObject.name = { $regex: query.name, $options: "i" };
    }

    return MedService.find(filterObject).sort(query.order);
  }

  public getAllGen(query: IMedServiceQuery): Promise<IMedServiceGen[]> {
    const filterObject: FilterQuery<IMedService> = {};

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

    return MedService.aggregate([
      {
        $match: filterObject,
      },
      {
        $lookup: {
          from: "complexes",
          localField: "_id",
          foreignField: "_medServiceId",
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
          from: "clinics",
          localField: "complexes._clinicId",
          foreignField: "_id",
          as: "clinic",
        },
      },
      { $unwind: "$clinic" },
      {
        $group: {
          medServiceName: { $first: "$name" },
          _id: {
            medServiceId: "$_id",
            doctorId: "$doctor._id",
            doctorName: "$doctor.name",
            doctorSurname: "$doctor.surname",
            phoneNumber: "$doctor.phoneNumber",
            email: "$doctor.email",
          },
          clinics: { $addToSet: "$clinic.name" },
        },
      },
      {
        $group: {
          _id: "$_id.medServiceId",
          medServiceName: { $first: "$medServiceName" },
          doctors: {
            $push: {
              doctorName: "$_id.doctorName",
              doctorSurname: "$_id.doctorSurname",
              phoneNumber: "$_id.phoneNumber",
              email: "$_id.email",
              clinics: "$clinics",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$medServiceName",
          doctors: 1,
        },
      },
      {
        $sort: orderObject,
      },
    ]);
  }

  public create(medService: IMedServiceCreateDTO): Promise<IMedService> {
    return MedService.create(medService);
  }

  public updateById(
    id: string,
    medService: IMedServiceCreateDTO,
  ): Promise<IMedService> {
    return MedService.findByIdAndUpdate(id, medService, { new: true });
  }

  public getById(id: string): Promise<IMedService> {
    return MedService.findById(id);
  }

  public deleteById(id: string): Promise<void> {
    return MedService.findByIdAndDelete(id);
  }

  public getByName(name: string): Promise<IMedService> {
    return MedService.findOne({ name });
  }
}

export const medServiceRepository = new MedServiceRepository();
