import { FilterQuery } from "mongoose";

import {
  IMedService,
  IMedServiceCreateDTO,
  IMedServiceQuery,
} from "../interfaces/med_service.interface";
import { MedService } from "../models/med_service.model";

class MedService_Repository {
  public getAll(query: IMedServiceQuery): Promise<IMedService[]> {
    const filterObject: FilterQuery<IMedService> = {};

    if (query.name) {
      filterObject.name = { $regex: query.name, $options: "i" };
    }

    return MedService.find(filterObject).sort(query.order);
  }

  public create(medService: IMedServiceCreateDTO): Promise<IMedService> {
    return MedService.create(medService);
  }

  public updateById(
    id: string,
    medService: IMedServiceCreateDTO,
  ): Promise<IMedService> {
    return MedService.findByIdAndUpdate(id, medService, { new: true });
  }

  public getById(id: string): Promise<IMedService> {
    return MedService.findById(id);
  }

  public deleteById(id: string): Promise<void> {
    return MedService.findByIdAndDelete(id);
  }
}

export const medService_Repository = new MedService_Repository();
