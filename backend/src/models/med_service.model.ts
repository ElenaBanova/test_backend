import { model, Schema } from "mongoose";

import { IMedService } from "../interfaces/med_service.interface";

const medServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    _doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
  },
  { timestamps: true, versionKey: false },
);

export const MedService = model<IMedService>("medService", medServiceSchema);
