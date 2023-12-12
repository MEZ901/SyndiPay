import mongoose from "../mongoose";

const apartmentSchema = new mongoose.Schema({
  apartmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  syndic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currentResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    default: null,
  },
  previousResidents: [
    {
      type: mongoose.Schema.Types.ObjectId,
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
});

apartmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment;
