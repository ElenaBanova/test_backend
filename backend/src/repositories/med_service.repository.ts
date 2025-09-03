import { FilterQuery } from "mongoose";

import { IMedServiceGen } from "../interfaces/IMedServiceGen.interface";
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
          from: "complexes",
          localField: "_id",
          foreignField: "_medServiceId",
          as: "med_Service",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "med_Service._doctorId",
          foreignField: "_id",
          as: "doctors",
        },
      },
      {
        $lookup: {
          from: "clinics",
          localField: "med_Service._clinicId",
          foreignField: "_id",
          as: "clinics",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          doctors: {
            $map: {
              input: "$doctors",
              as: "d",
              in: {
                name: "$$d.name",
                surname: "$$d.surname",
                phoneNumber: "$$d.phoneNumber",
                email: "$$d.email",
                clinics: {
                  $map: {
                    input: "$clinics",
                    as: "c",
                    in: "$$c.name",
                  },
                },
              },
            },
          },
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

  public getByName(name: string): Promise<IMedService> {
    return MedService.findOne({ name });
  }
}

export const medService_Repository = new MedService_Repository();
