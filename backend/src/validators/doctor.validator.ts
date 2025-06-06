import joi from "joi";

import { BaseQueryOrderEnum } from "../enums/base-query-order.enum";
import { RegexEnum } from "../enums/regex.enum";

export class DoctorValidator {
  private static name = joi.string().regex(RegexEnum.NAME);
  private static surname = joi.string().regex(RegexEnum.NAME);
  private static phoneNumber = joi.string().regex(RegexEnum.PHONE_NUMBER);
  private static email = joi.string().email();

  public static create = joi.object({
    name: this.name.required(),
    surname: this.surname.required(),
    phoneNumber: this.phoneNumber.required(),
    email: this.email.required(),
  });

  public static query = joi.object({
    name: joi.string().trim(),
    surname: joi.string().trim(),
    phoneNumber: joi.string().trim(),
    email: joi.string().trim(),
    order: joi
      .string()
      .valid(
        ...Object.values(BaseQueryOrderEnum),
        ...Object.values(BaseQueryOrderEnum).map((item) => `-${item}`),
      ),
  });

  public static update = joi.object({
    name: this.name,
    surname: this.surname,
    phoneNumber: this.phoneNumber,
    email: this.email,
  });
}
