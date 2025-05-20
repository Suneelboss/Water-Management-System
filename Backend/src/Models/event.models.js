import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  deviceId: String,
  type: String,
  description: String,
  details: String,
  timestamp: { type: Date, default: Date.now },
});

export const Event = mongoose.model("Event", eventSchema);
