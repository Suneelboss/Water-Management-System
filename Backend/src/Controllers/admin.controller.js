import { Device } from "../Models/device.models.js";
import { User } from "../Models/user.models.js";
import { calculateTotalWaterUsage } from "../utils/waterUsage.js";

// Get all users with role "user"
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .lean(); // Better performance since no Mongoose document methods needed

    res.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

// Get all controller devices with their owners
export const getControllers = async (req, res) => {
  try {
    const controllers = await Device.find()
      .populate("owner", "name email")
      .lean(); // Optimized with lean()

    res.json({ success: true, controllers });
  } catch (err) {
    console.error("Error fetching controllers:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch controllers",
      error: err.message,
    });
  }
};

// Get overall water usage for a given period
export const getOverallWaterUsage = async (req, res) => {
  try {
    const { period } = req.query;

    if (!period) {
      return res.status(400).json({
        success: false,
        message: "Period query parameter is required",
      });
    }

    const startDate = getStartDate(period);

    const devices = await Device.find().lean();
    const totalUsage = calculateTotalWaterUsage(devices, startDate);

    res.json({
      success: true,
      period,
      totalUsage,
    });
  } catch (err) {
    console.error("Error calculating water usage:", err);
    res.status(500).json({
      success: false,
      message: "Failed to calculate water usage",
      error: err.message,
    });
  }
};

// Helper function to determine the start date based on the period
const getStartDate = (period) => {
  const now = new Date();

  switch (period) {
    case "day":
      return new Date(now.setDate(now.getDate() - 1));
    case "week":
      return new Date(now.setDate(now.getDate() - 7));
    case "month":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "year":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      throw new Error("Invalid period specified");
  }
};
