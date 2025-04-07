import { Device } from "../Models/device.models.js";

export const logWaterUsage = async (req, res) => {
  try {
    const { controllerId, usage } = req.body;
    const controller = await Device.findById(controllerId);

    if (!controller)
      return res.status(404).json({ error: "Controller not found" });

    controller.waterUsageLogs.push({ usage });
    await controller.save();

    res.json({ message: "Water usage logged successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserWaterUsage = async (req, res) => {
  try {
    const { period } = req.query; // "daily", "weekly", "monthly", "yearly"

    const startDate = getStartDate(period);

    const controllers = await Device.find({ owner: req.user._id });
    let usageData = [];

    controllers.forEach((controller) => {
      const filteredLogs = controller.waterUsageLogs.filter(
        (log) => log.date >= startDate
      );
      const totalUsage = filteredLogs.reduce((sum, log) => sum + log.usage, 0);
      usageData.push({
        controllerId: controller._id,
        name: controller.name,
        totalUsage,
      });
    });

    res.json({ period, usageData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function getStartDate(period) {
  const now = new Date();
  if (period === "daily") return new Date(now.setHours(0, 0, 0, 0));
  if (period === "weekly") return new Date(now.setDate(now.getDate() - 7));
  if (period === "monthly") return new Date(now.setMonth(now.getMonth() - 1));
  if (period === "yearly")
    return new Date(now.setFullYear(now.getFullYear() - 1));
  return now;
}
