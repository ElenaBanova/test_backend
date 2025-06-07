import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IClinicCreateDTO } from "../interfaces/clinic.interface";
import { clinicService } from "../services/clinic.service";

class ClinicControllers {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await clinicService.getAll(req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getAllGen(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await clinicService.getAllGen(req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const clinic = req.body as IClinicCreateDTO;
      const data = await clinicService.create(clinic);
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clinic = req.body as IClinicCreateDTO;
      const data = await clinicService.updateById(id, clinic);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await clinicService.getById(id);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await clinicService.deleteById(id);
      res.status(StatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  }
}

export const clinicControllers = new ClinicControllers();
