import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
  IDoctor,
  IDoctorCreateDTO,
  IDoctorQuery,
} from "../interfaces/doctor.interface";
import { doctorRepository } from "../repositories/doctor.repository";
import { clinicService } from "./clinic.service";

class DoctorService {
  public getAll(query: IDoctorQuery): Promise<IDoctor[]> {
    return doctorRepository.getAll(query);
  }

  public async create(doctor: IDoctorCreateDTO, _id: string): Promise<IDoctor> {
    const clinic = await clinicService.getById(_id);
    if (!clinic) {
      throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
    }

    const obj = { ...doctor, _clinicId: _id };

    return await doctorRepository.create(obj);
  }

  public async updateById(
    id: string,
    doctor: IDoctorCreateDTO,
  ): Promise<IDoctor> {
    const doc = await doctorRepository.getById(id);
    if (!doc) {
      throw new ApiError(`Doctor not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await doctorRepository.updateById(id, doctor);
  }

  public async getById(id: string): Promise<IDoctor> {
    const doctor = await doctorRepository.getById(id);
    if (!doctor) {
      throw new ApiError(`Doctor not found`, StatusCodesEnum.NOT_FOUND);
    }
    return doctor;
  }

  public async deleteById(id: string): Promise<void> {
    const doctor = await doctorRepository.getById(id);
    if (!doctor) {
      throw new ApiError(`Doctor not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await doctorRepository.deleteById(id);
  }
}

export const doctorService = new DoctorService();
