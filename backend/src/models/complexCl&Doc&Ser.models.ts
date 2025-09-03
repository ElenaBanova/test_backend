import { model, Schema } from "mongoose";

import { IComplex } from "../interfaces/IComplex.interface";

const complexSchema = new Schema(
  {
    _clinicId: { type: Schema.Types.ObjectId, required: true, ref: "Clinic" },
    _doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
    _medServiceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "MedService",
    },
  },
  { timestamps: true, versionKey: false },
);

export const Complex = model<IComplex>("complex", complexSchema);
