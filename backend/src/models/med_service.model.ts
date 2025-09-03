import { model, Schema } from "mongoose";

import { IMedService } from "../interfaces/med_service.interface";

const medServiceSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const MedService = model<IMedService>("medService", medServiceSchema);
