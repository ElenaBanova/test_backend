import { FilterQuery } from "mongoose";

import {
  IClinic,
  IClinicCreateDTO,
  IClinicQuery,
} from "../interfaces/clinic.interface";
import { IClinicGen } from "../interfaces/IClinicGen.interface";
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
          from: "complexes",
          localField: "_id",
          foreignField: "_clinicId",
          as: "clinic",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "clinic._doctorId",
          foreignField: "_id",
          as: "doctors",
        },
      },
      {
        $lookup: {
          from: "medservices",
          localField: "clinic._medServiceId",
          foreignField: "_id",
          as: "med_Services",
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
