import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
  IDoctorCreateOrUpdate,
  IDoctorQuery,
} from "../interfaces/doctor.interface";
import { doctorService } from "../services/doctor.service";

class DoctorController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as IDoctorQuery;
      const data = await doctorService.getAll(query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getAllGen(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as IDoctorQuery;
      const data = await doctorService.getAllGen(query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = req.body as IDoctorCreateOrUpdate;
      const data = await doctorService.create(doctor);
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clinic = req.body as IDoctorCreateOrUpdate;
      const data = await doctorService.updateById(id, clinic);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await doctorService.getById(id);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await doctorService.deleteById(id);
      res.status(StatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  }
}

export const doctorController = new DoctorController();
