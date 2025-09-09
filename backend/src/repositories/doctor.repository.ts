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
        $lookup: {
          from: "complexes",
          localField: "_id",
          foreignField: "_doctorId",
          as: "complexes",
        },
      },
      { $unwind: "$complexes" },
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
        $lookup: {
          from: "medservices",
          localField: "complexes._medServiceId",
          foreignField: "_id",
          as: "med_Service",
        },
      },
      { $unwind: "$med_Service" },
      {
        $group: {
          doctorName: { $first: "$name" },
          doctorSurname: { $first: "$surname" },
          phoneNumber: { $first: "$phoneNumber" },
          email: { $first: "$email" },
          _id: {
            doctorId: "$_id",
            clinicId: "$clinic._id",
            clinicName: "$clinic.name",
          },
          medServices: { $addToSet: "$med_Service.name" },
        },
      },
      {
        $group: {
          _id: "$_id.doctorId",
          doctorName: { $first: "$doctorName" },
          doctorSurname: { $first: "$doctorSurname" },
          phoneNumber: { $first: "$phoneNumber" },
          email: { $first: "$email" },
          clinics: {
            $push: {
              name: "$_id.clinicName",
              med_Services: "$medServices",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$doctorName",
          surname: "$doctorSurname",
          phoneNumber: "$phoneNumber",
          email: "$email",
          clinics: 1,
        },
      },
      {
        $sort: orderObject,
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
