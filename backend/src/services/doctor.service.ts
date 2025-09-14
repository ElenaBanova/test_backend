import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
  IDoctor,
  // IDoctorCreateDTO,
  IDoctorCreateOrUpdate,
  IDoctorQuery,
} from "../interfaces/doctor.interface";
import { IDoctorGen } from "../interfaces/IDoctorGen.interface";
import { doctorRepository } from "../repositories/doctor.repository";

class DoctorService {
  public getAll(query: IDoctorQuery): Promise<IDoctor[]> {
    return doctorRepository.getAll(query);
  }

  public getAllGen(query: IDoctorQuery): Promise<IDoctorGen[]> {
    return doctorRepository.getAllGen(query);
  }

  public async create(doctor: IDoctorCreateOrUpdate): Promise<IDoctor> {
    return await doctorRepository.create(doctor);
  }

  public async updateById(
    id: string,
    doctor: IDoctorCreateOrUpdate,
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

  // public async isDoctorUnique(key: string, value: string): Promise<void> {
  //   const doctor = await doctorRepository.getByOne(key, value);
  //
  //   if (doctor) {
  //     throw new ApiError(
  //       `Doctor is already exists`,
  //       StatusCodesEnum.BAD_REQUEST,
  //     );
  //   }
  // }
}

export const doctorService = new DoctorService();
