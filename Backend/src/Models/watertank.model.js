import mongoose from "mongoose";

const waterTankSchema = new mongoose.Schema({
  deviceId: String,
  level: Number,
  motorStatus: String,
  leakage: Boolean,
  dryRun: Boolean,
  leakageFloor: Number,
  totalConsumed: Number,
  flowRate: Number, // Added flow rate field
  createdAt: { type: Date, default: Date.now },
});

export const WaterTank = mongoose.model("WaterTank", waterTankSchema);
