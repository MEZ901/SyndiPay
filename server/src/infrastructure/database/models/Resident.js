import { Schema, model } from "mongoose";

const residentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      default: null,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

residentSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resident = model("Resident", residentSchema);

export default Resident;
