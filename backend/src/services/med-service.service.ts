import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
  IMedService,
  IMedServiceCreateDTO,
  IMedServiceQuery,
} from "../interfaces/med_service.interface";
import { medService_Repository } from "../repositories/med_service.repository";
import { doctorService } from "./doctor.service";

class MedService_Service {
  public getAll(query: IMedServiceQuery): Promise<IMedService[]> {
    return medService_Repository.getAll(query);
  }

  public async create(
    medService: IMedServiceCreateDTO,
    id: string,
  ): Promise<IMedService> {
    const doctor = await doctorService.getById(id);
    if (!doctor) {
      throw new ApiError("Clinic not found", StatusCodesEnum.NOT_FOUND);
    }
    const obj = { ...medService, _doctorId: id };

    return await medService_Repository.create(obj);
  }

  public async updateById(
    id: string,
    medService: IMedServiceCreateDTO,
  ): Promise<IMedService> {
    const med_service = await medService_Repository.getById(id);
    if (!med_service) {
      throw new ApiError(`Service not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await medService_Repository.updateById(id, medService);
  }

  public async getById(id: string): Promise<IMedService> {
    const medService = await medService_Repository.getById(id);
    if (!medService) {
      throw new ApiError(`Service not found`, StatusCodesEnum.NOT_FOUND);
    }
    return medService;
  }

  public async deleteById(id: string): Promise<void> {
    const med_service = await medService_Repository.getById(id);
    if (!med_service) {
      throw new ApiError(`Service not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await medService_Repository.deleteById(id);
  }
}

export const medService_Service = new MedService_Service();
