import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },
    resident: {
      type: Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentDuration: {
      type: String,
      enum: ["1 month", "3 months", "6 months", "1 year"],
      default: "1 month",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "check", "bankTransfer"],
      default: "cash",
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

paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Payment = model("Payment", paymentSchema);

export default Payment;
