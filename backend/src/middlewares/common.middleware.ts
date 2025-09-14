import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { Doctor } from "../models/doctor.model";
import { User } from "../models/user.model";

const modelsMap = {
  User,
  Doctor,
};

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(
            `Invalid ${key}: ${id}`,
            StatusCodesEnum.BAD_REQUEST,
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validateBody(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }

  public query(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }

  public checkEmailUnique(model: string, key: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const email = req.body[key];
        const Model = modelsMap[model];
        const user = await Model.findOne({ [key]: email });
        if (user) {
          throw new ApiError(
            `User with this email: ${email} already exists`,
            StatusCodesEnum.BAD_REQUEST,
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
