import { FilterQuery, Types } from "mongoose";

import {
  IComplex,
  IComplexCreateDTO,
  IComplexQueryOrUpdate,
} from "../interfaces/IComplex.interface";
import { IComplexGetAll } from "../interfaces/IComplexGetAll.interface";
import { Complex } from "../models/complexCl&Doc&Ser.models";

class ComplexClDocSerRepository {
  public getAll(query: IComplexQueryOrUpdate): Promise<IComplexGetAll[]> {
    const filterObject: FilterQuery<IComplex> = {};
    if (query._clinicId) {
      filterObject._clinicId = new Types.ObjectId(query._clinicId);
    }

    if (query._doctorId) {
      filterObject._doctorId = new Types.ObjectId(query._doctorId);
    }

    if (query._medServiceId) {
      filterObject._medServiceId = new Types.ObjectId(query._medServiceId);
    }

    return Complex.aggregate([
      {
        $match: filterObject,
      },
      {
        $lookup: {
          from: "clinics",
          localField: "_clinicId",
          foreignField: "_id",
          as: "clinic",
        },
      },
      { $unwind: { path: "$clinic", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "doctors",
          localField: "_doctorId",
          foreignField: "_id",
          as: "doctorInfo",
        },
      },
      { $unwind: { path: "$doctorInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "medservices",
          localField: "_medServiceId",
          foreignField: "_id",
          as: "med_ServiceInfo",
        },
      },
      {
        $unwind: { path: "$med_ServiceInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$clinic.name", ""] },
          doctorName: { $ifNull: ["$doctorInfo.name", ""] },
          doctorSurname: { $ifNull: ["$doctorInfo.surname", ""] },
          doctorPhoneNumber: { $ifNull: ["$doctorInfo.phoneNumber", ""] },
          doctorEmail: { $ifNull: ["$doctorInfo.email", ""] },
          medServiceName: { $ifNull: ["$med_ServiceInfo.name", ""] },
        },
      },
    ]);
  }

  public create(complexCard: IComplexCreateDTO): Promise<IComplex> {
    return Complex.create(complexCard);
  }

  public getByOneUnique(
    _clinicId: string,
    _doctorId: string,
    _medServiceId: string,
  ): Promise<IComplex> {
    const filterObject: FilterQuery<IComplex> = {
      _clinicId: new Types.ObjectId(_clinicId),
      _doctorId: new Types.ObjectId(_doctorId),
      _medServiceId: new Types.ObjectId(_medServiceId),
    };
    return Complex.findOne(filterObject._id);
  }

  public getById(id: string): Promise<IComplex> {
    return Complex.findById(id);
  }

  public updateById(
    id: string,
    complexCard: IComplexQueryOrUpdate,
  ): Promise<IComplex> {
    return Complex.findByIdAndUpdate(id, complexCard, { new: true });
  }

  public deleteById(id: string): Promise<void> {
    return Complex.findByIdAndDelete(id);
  }
}

export const complexClDocSerRepository = new ComplexClDocSerRepository();
