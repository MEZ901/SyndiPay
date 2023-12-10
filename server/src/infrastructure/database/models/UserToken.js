import mongoose from "../mongoose.js";

const userTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDeleted: {
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
});

userTokenSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userTokenSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 2592000 });

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
