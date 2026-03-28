import mongoose, { Schema } from "mongoose";

const PrescriptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    input: {
      type: Schema.Types.Mixed,
      required: true,
    },
    result: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", PrescriptionSchema);

export default Prescription;
