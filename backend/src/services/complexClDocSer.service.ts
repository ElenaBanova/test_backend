import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
  IComplexCreateDTO,
  IComplexQueryOrUpdate,
} from "../interfaces/IComplex.interface";
import { IComplexGetAll } from "../interfaces/IComplexGetAll.interface";
import { complexClDocSer_Repository } from "../repositories/complexClDocSer.repository";
import { clinicService } from "./clinic.service";
import { doctorService } from "./doctor.service";
import { medService_Service } from "./med-service.service";

class ComplexClDocSer_Service {
  public getAll(query: IComplexQueryOrUpdate): Promise<IComplexGetAll[]> {
    return complexClDocSer_Repository.getAll(query);
  }

  public async create(complexCard: IComplexCreateDTO): Promise<IComplexGetAll> {
    await this.isComplexCardUnique(
      complexCard._clinicId,
      complexCard._doctorId,
      complexCard._medServiceId,
    );

    const { _id, _clinicId, _doctorId, _medServiceId } =
      await complexClDocSer_Repository.create(complexCard);

    const clinic = await clinicService.getById(_clinicId);
    const doctor = await doctorService.getById(_doctorId);
    const medService = await medService_Service.getById(_medServiceId);
    return {
      _id,
      name: clinic.name,
      doctorName: doctor.name,
      doctorSurname: doctor.surname,
      doctorPhoneNumber: doctor.phoneNumber,
      doctorEmail: doctor.email,
      medServiceName: medService.name,
    };
  }

  public async getById(id: string): Promise<IComplexGetAll> {
    const complexCardValid = await complexClDocSer_Repository.getById(id);

    if (!complexCardValid) {
      throw new ApiError(`Information not found`, StatusCodesEnum.NOT_FOUND);
    }

    const { _id, _clinicId, _doctorId, _medServiceId } =
      await complexClDocSer_Repository.getById(id);

    const clinic = await clinicService.getById(_clinicId);
    const doctor = await doctorService.getById(_doctorId);
    const medService = await medService_Service.getById(_medServiceId);

    return {
      _id,
      name: clinic.name,
      doctorName: doctor.name,
      doctorSurname: doctor.surname,
      doctorPhoneNumber: doctor.phoneNumber,
      doctorEmail: doctor.email,
      medServiceName: medService.name,
    };
  }

  public async updateById(
    id: string,
    complexCard: IComplexQueryOrUpdate,
  ): Promise<IComplexGetAll> {
    const card = await complexClDocSer_Repository.getById(id);
    if (!card) {
      throw new ApiError(`Information not found`, StatusCodesEnum.NOT_FOUND);
    }
    if (
      complexCard._clinicId &&
      complexCard._doctorId &&
      complexCard._medServiceId
    ) {
      await this.isComplexCardUnique(
        complexCard._clinicId,
        complexCard._doctorId,
        complexCard._medServiceId,
      );
    }
    if (complexCard._clinicId && complexCard._doctorId) {
      await this.isComplexCardUnique(
        complexCard._clinicId,
        complexCard._doctorId,
        card._medServiceId,
      );
    }
    if (complexCard._clinicId && complexCard._medServiceId) {
      await this.isComplexCardUnique(
        complexCard._clinicId,
        card._doctorId,
        complexCard._medServiceId,
      );
    }
    if (complexCard._doctorId && complexCard._medServiceId) {
      await this.isComplexCardUnique(
        card._clinicId,
        complexCard._doctorId,
        complexCard._medServiceId,
      );
    }
    if (complexCard._clinicId) {
      await this.isComplexCardUnique(
        complexCard._clinicId,
        card._doctorId,
        card._medServiceId,
      );
    }
    if (complexCard._doctorId) {
      await this.isComplexCardUnique(
        card._clinicId,
        complexCard._doctorId,
        card._medServiceId,
      );
    }
    if (complexCard._medServiceId) {
      await this.isComplexCardUnique(
        card._clinicId,
        card._doctorId,
        complexCard._medServiceId,
      );
    }

    const { _id, _clinicId, _doctorId, _medServiceId } =
      await complexClDocSer_Repository.updateById(id, complexCard);

    const clinic = await clinicService.getById(_clinicId);
    const doctor = await doctorService.getById(_doctorId);
    const medService = await medService_Service.getById(_medServiceId);

    return {
      _id,
      name: clinic.name,
      doctorName: doctor.name,
      doctorSurname: doctor.surname,
      doctorPhoneNumber: doctor.phoneNumber,
      doctorEmail: doctor.email,
      medServiceName: medService.name,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const complexCard = await complexClDocSer_Repository.getById(id);
    if (!complexCard) {
      throw new ApiError(`Information not found`, StatusCodesEnum.NOT_FOUND);
    }
    return await complexClDocSer_Repository.deleteById(id);
  }

  public async isComplexCardUnique(
    _clinicId: string,
    _doctorId: string,
    _medServiceId: string,
  ): Promise<void> {
    const complexCard = await complexClDocSer_Repository.getByOneUnique(
      _clinicId,
      _doctorId,
      _medServiceId,
    );
    if (complexCard.length > 0) {
      throw new ApiError(
        `A doctor's card already exists in this clinic.`,
        StatusCodesEnum.BAD_REQUEST,
      );
    }
  }
}

export const complexClDocSer_Service = new ComplexClDocSer_Service();
