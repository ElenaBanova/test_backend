import joi from "joi";

import { BaseQueryOrderEnum } from "../enums/base-query-order.enum";
import { RegexEnum } from "../enums/regex.enum";

export class ClinicValidator {
  private static name = joi.string().trim().regex(RegexEnum.CLINIC_NAME);

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
