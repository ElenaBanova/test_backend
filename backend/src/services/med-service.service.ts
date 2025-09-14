import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IMedServiceGen } from "../interfaces/IMedServiceGen.interface";
import {
  IMedService,
  IMedServiceCreateDTO,
  IMedServiceQuery,
} from "../interfaces/med_service.interface";
import { medServiceRepository } from "../repositories/med_service.repository";

class MedServiceService {
  public getAll(query: IMedServiceQuery): Promise<IMedService[]> {
    return medServiceRepository.getAll(query);
  }

  public getAllGen(query: IMedServiceQuery): Promise<IMedServiceGen[]> {
    return medServiceRepository.getAllGen(query);
  }

  public async create(medService: IMedServiceCreateDTO): Promise<IMedService> {
    await medServiceService.isNameUnique(medService.name);
    return await medServiceRepository.create(medService);
  }

  public async updateById(
    id: string,
    medService: IMedServiceCreateDTO,
  ): Promise<IMedService> {
    const med_service = await medServiceRepository.getById(id);
    if (!med_service) {
      throw new ApiError(`Service not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await medServiceRepository.updateById(id, medService);
  }

  public async getById(id: string): Promise<IMedService> {
    const medService = await medServiceRepository.getById(id);
    if (!medService) {
      throw new ApiError(`Service not found`, StatusCodesEnum.NOT_FOUND);
    }
    return medService;
  }

  public async deleteById(id: string): Promise<void> {
    const med_service = await medServiceRepository.getById(id);
    if (!med_service) {
      throw new ApiError(`Service not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await medServiceRepository.deleteById(id);
  }

  public async isNameUnique(name: string): Promise<void> {
    const medService = await medServiceRepository.getByName(name);

    if (medService) {
      throw new ApiError(
        "Medical service is already exists",
        StatusCodesEnum.BAD_REQUEST,
      );
    }
  }
}

export const medServiceService = new MedServiceService();
