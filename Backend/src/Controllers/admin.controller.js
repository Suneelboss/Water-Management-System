import { Device } from "../Models/device.models.js";
import { User } from "../Models/user.models.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getControllers = async (req, res) => {
  try {
    const controllers = await Device.find().populate("owner", "name email");
    res.json(controllers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOverallWaterUsage = async (req, res) => {
  try {
    const { period } = req.query;
    const startDate = getStartDate(period);

    const controllers = await Device.find();
    let totalUsage = 0;

    controllers.forEach((controller) => {
      const filteredLogs = controller.waterUsageLogs.filter(
        (log) => log.date >= startDate
      );
      totalUsage += filteredLogs.reduce((sum, log) => sum + log.usage, 0);
    });

    res.json({ period, totalUsage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
