import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  isActivated: { type: Boolean, default: false },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Customer schema
const customerSchema = new mongoose.Schema({
  ...userSchema.obj,

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "customer",
    enum: ["customer"],
  },
  liveLocation: {
    logitude: { type: Number },
    latitude: { type: Number },
  },
  address: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Customer = mongoose.model("Customer", customerSchema);
