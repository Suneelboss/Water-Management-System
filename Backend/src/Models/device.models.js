import mongoose from "mongoose";

const WaterUsageSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  usage: {
    type: Number,
    required: true,
  },
});

const DeviceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  waterLevel: {
    type: Number,
    default: 0,
  },
  pumpStatus: {
    type: Boolean,
    default: false,
  },
  dryRunProtection: {
    type: Boolean,
    default: true,
  },
  leakageDetected: {
    type: Boolean,
    default: false,
  },
  autoMode: {
    type: Boolean,
    default: true,
  },
  tankHeight: {
    type: Number,
    required: true,
  },
  dryRunDelay: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  waterUsageLogs: [WaterUsageSchema],
});

export const Device = mongoose.model("Device", DeviceSchema);
