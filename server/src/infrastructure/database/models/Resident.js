import mongoose from "../mongoose.js";

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    default: null,
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
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
});

residentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resident = mongoose.model("Resident", residentSchema);

export default Resident;
