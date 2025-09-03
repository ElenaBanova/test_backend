import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { complexClDocSer_Service } from "../services/complexClDocSer.service";

class ComplexClDocSer_Controller {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await complexClDocSer_Service.getAll(req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        idCl: _clinicId,
        idDoc: _doctorId,
        idServ: _medServiceId,
      } = req.params;
      const data = await complexClDocSer_Service.create({
        _clinicId,
        _doctorId,
        _medServiceId,
      });
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await complexClDocSer_Service.getById(id);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await complexClDocSer_Service.updateById(id, req.query);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await complexClDocSer_Service.deleteById(id);
      res.status(StatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  }
}

export const complexClDocSer_Controller = new ComplexClDocSer_Controller();
