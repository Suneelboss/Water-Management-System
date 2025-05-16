import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  controller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TankController",
    required: true,
  },
  action: {
    type: String,
    required: true,
  }, // e.g., "Pump turned ON", "Water level low"
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
export const Log = mongoose.model("Log", LogSchema);
