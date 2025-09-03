import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
  IClinic,
  IClinicCreateDTO,
  IClinicQuery,
} from "../interfaces/clinic.interface";
import { IClinicGen } from "../interfaces/IClinicGen.interface";
import { clinicRepository } from "../repositories/clinic.repository";

class ClinicService {
  public getAll(query: IClinicQuery): Promise<IClinic[]> {
    return clinicRepository.getAll(query);
  }

  public getAllGen(query: IClinicQuery): Promise<IClinicGen[]> {
    return clinicRepository.getAllGen(query);
  }

  public async create(clinic: IClinicCreateDTO): Promise<IClinic> {
    await clinicService.isNameUnique(clinic.name);
    return await clinicRepository.create(clinic);
  }

  public async updateById(
    id: string,
    clinic: IClinicCreateDTO,
  ): Promise<IClinic> {
    const clinicValid = await clinicRepository.getById(id);
    if (!clinicValid) {
      throw new ApiError(`Invalid id : ${id}`, StatusCodesEnum.BAD_REQUEST);
    }
    return await clinicRepository.updateById(id, clinic);
  }

  public async getById(id: string): Promise<IClinic> {
    const clinicValid = await clinicRepository.getById(id);
    if (!clinicValid) {
      throw new ApiError(`Clinic not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await clinicRepository.getById(id);
  }

  public async deleteById(id: string): Promise<void> {
    const clinicValid = await clinicRepository.getById(id);
    if (!clinicValid) {
      throw new ApiError(`Clinic not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await clinicRepository.deleteById(id);
  }

  public async isNameUnique(name: string): Promise<void> {
    const clinic = await clinicRepository.getByName(name);

    if (clinic) {
      throw new ApiError(
        "Clinic is already exists",
        StatusCodesEnum.BAD_REQUEST,
      );
    }
  }
}

export const clinicService = new ClinicService();
