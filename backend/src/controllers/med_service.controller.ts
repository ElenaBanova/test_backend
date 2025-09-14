import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IMedServiceCreateDTO } from "../interfaces/med_service.interface";
import { medServiceService } from "../services/med-service.service";

class MedServiceController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await medServiceService.getAll(req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getAllGen(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await medServiceService.getAllGen(req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const service = req.body as IMedServiceCreateDTO;
      const data = await medServiceService.create(service);
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const service = req.body as IMedServiceCreateDTO;
      const data = await medServiceService.updateById(id, service);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await medServiceService.getById(id);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await medServiceService.deleteById(id);
      res.status(StatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  }
}

export const medServiceController = new MedServiceController();
