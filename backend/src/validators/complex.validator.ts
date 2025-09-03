import joi from "joi";

export class ComplexValidator {
  public static query = joi.object({
    _clinicId: joi.string().trim(),
    _doctorId: joi.string().trim(),
    _medServiceId: joi.string().trim(),
  });
}
