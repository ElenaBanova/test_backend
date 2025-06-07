import { FilterQuery } from "mongoose";

import { IMedServiceGen } from "../interfaces/IMedServiceGen";
import {
  IMedService,
  IMedServiceCreateDTO,
  IMedServiceQuery,
} from "../interfaces/med_service.interface";
import { MedService } from "../models/med_service.model";

class MedService_Repository {
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
        $sort: orderObject,
      },
      {
        $lookup: {
          from: "doctors",
          localField: "_doctorId",
          foreignField: "_id",
          as: "doctorInfo",
        },
      },

      {
        $lookup: {
          from: "clinics",
          localField: "doctorInfo._clinicId",
          foreignField: "_id",
          as: "clinicInfo",
        },
      },
      {
        $unwind: "$doctorInfo",
      },
      {
        $project: {
          _id: 0,
          _doctorId: 0,
          createdAt: 0,
          updatedAt: 0,
          "doctorInfo._id": 0,
          "doctorInfo.createdAt": 0,
          "doctorInfo.updatedAt": 0,
          "doctorInfo._clinicId": 0,
          "med_ServiceInfo._id": 0,
          "med_ServiceInfo._doctorId": 0,
          "med_ServiceInfo.createdAt": 0,
          "med_ServiceInfo.updatedAt": 0,
        },
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
}

export const medService_Repository = new MedService_Repository();
