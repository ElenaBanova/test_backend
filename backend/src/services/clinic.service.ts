import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
  IClinic,
  IClinicCreateDTO,
  IClinicQuery,
} from "../interfaces/clinic.interface";
import { clinicRepository } from "../repositories/clinic.repository";

class ClinicService {
  public getAll(query: IClinicQuery): Promise<IClinic[]> {
    return clinicRepository.getAll(query);
  }

  public create(clinic: IClinicCreateDTO): Promise<IClinic> {
    return clinicRepository.create(clinic);
  }

  public async updateById(
    id: string,
    clinic: IClinicCreateDTO,
  ): Promise<IClinic> {
    const clinicValid = await clinicRepository.getById(id);
    if (!clinicValid) {
      throw new ApiError(`Invalid id : ${id}`, 400);
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
}

export const clinicService = new ClinicService();
