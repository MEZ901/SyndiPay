import { Schema, model } from "mongoose";

const apartmentSchema = new Schema(
  {
    apartmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    syndic: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentResident: {
      type: Schema.Types.ObjectId,
      ref: "Resident",
      default: null,
    },
    previousResidents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resident",
      },
    ],
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

apartmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Apartment = model("Apartment", apartmentSchema);

export default Apartment;
