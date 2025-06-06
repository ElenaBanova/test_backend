import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IMedServiceCreateDTO } from "../interfaces/med_service.interface";
import { medService_Service } from "../services/med-service.service";

class MedService_Controller {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await medService_Service.getAll(req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: _doctorId } = req.params;
      const service = req.body as IMedServiceCreateDTO;
      const data = await medService_Service.create(service, _doctorId);
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const service = req.body as IMedServiceCreateDTO;
      const data = await medService_Service.updateById(id, service);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await medService_Service.getById(id);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await medService_Service.deleteById(id);
      res.status(StatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  }
}

export const medService_Controller = new MedService_Controller();
