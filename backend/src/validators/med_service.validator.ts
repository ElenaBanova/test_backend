import joi from "joi";

import { BaseQueryOrderEnum } from "../enums/base-query-order.enum";
import { MedServiceEnum } from "../enums/medService.enum";

export class MedServiceValidator {
  private static name = joi.string().valid(...Object.values(MedServiceEnum));

  public static create = joi.object({
    name: this.name.required(),
  });

  public static query = joi.object({
    name: joi.string().trim(),
    order: joi
      .string()
      .valid(BaseQueryOrderEnum.NAME, `-${BaseQueryOrderEnum.NAME}`),
  });
}
