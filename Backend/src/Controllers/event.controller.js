import { Event } from "../Models/event.models.js";

export const getEvents = async (req, res) => {
  try {
    const { role } = req.user; // assuming user info is attached to req.user by auth middleware
    const { deviceId } = req.body;

    console.log("Get event api hit", req.body);

    let events;

    if (role === "admin") {
      events = await Event.find().sort({ timestamp: -1 });
    } else {
      if (!deviceId) {
        return res.status(400).json({ message: "Device ID is required." });
      }
      events = await Event.find({ deviceId }).sort({ timestamp: -1 });
    }
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
