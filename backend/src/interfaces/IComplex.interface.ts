import { IBase } from "./base.interface";

interface IComplex extends IBase {
  _id: string;
  _clinicId: string;
  _doctorId: string;
  _medServiceId: string;
}

type IComplexCreateDTO = Pick<
  IComplex,
  "_clinicId" | "_doctorId" | "_medServiceId"
>;

interface IComplexQueryOrUpdate {
  _clinicId?: string;
  _doctorId?: string;
  _medServiceId?: string;
}

export { IComplex, IComplexCreateDTO, IComplexQueryOrUpdate };
