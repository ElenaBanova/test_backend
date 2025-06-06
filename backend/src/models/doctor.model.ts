import { model, Schema } from "mongoose";

import { IDoctor } from "../interfaces/doctor.interface";

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    _clinicId: { type: Schema.Types.ObjectId, required: true, ref: "Clinic" },
  },
  { timestamps: true, versionKey: false },
);

export const Doctor = model<IDoctor>("doctor", doctorSchema);
