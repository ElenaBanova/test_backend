import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IMedServiceGen } from "../interfaces/IMedServiceGen.interface";
import {
  IMedService,
  IMedServiceCreateDTO,
  IMedServiceQuery,
} from "../interfaces/med_service.interface";
import { medService_Repository } from "../repositories/med_service.repository";

class MedService_Service {
  public getAll(query: IMedServiceQuery): Promise<IMedService[]> {
    return medService_Repository.getAll(query);
  }

  public getAllGen(query: IMedServiceQuery): Promise<IMedServiceGen[]> {
    return medService_Repository.getAllGen(query);
  }

  public async create(medService: IMedServiceCreateDTO): Promise<IMedService> {
    await medService_Service.isNameUnique(medService.name);
    return await medService_Repository.create(medService);
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

  public async isNameUnique(name: string): Promise<void> {
    const medService = await medService_Repository.getByName(name);

    if (medService) {
      throw new ApiError(
        "Medical service is already exists",
        StatusCodesEnum.BAD_REQUEST,
      );
    }
  }
}

export const medService_Service = new MedService_Service();
