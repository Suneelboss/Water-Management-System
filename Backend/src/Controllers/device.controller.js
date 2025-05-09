import { Device } from "../Models/device.models.js";

export const getMyControllers = async (req, res) => {
  try {
    const controllers = await Device.find({ owner: req.user._id });
    res.json(controllers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateControllerSettings = async (req, res) => {
  try {
    const {
      controllerId,
      autoMode,
      dryRunProtection,
      tankHeight,
      dryRunDelay,
    } = req.body;
    const controller = await Device.findById(controllerId);

    if (!controller)
      return res.status(404).json({ error: "Controller not found" });
    if (controller.owner.toString() !== req.user._id)
      return res.status(403).json({ error: "Unauthorized" });

    if (autoMode !== undefined) controller.autoMode = autoMode;
    if (dryRunProtection !== undefined)
      controller.dryRunProtection = dryRunProtection;
    if (tankHeight !== undefined) controller.tankHeight = tankHeight;
    if (dryRunDelay !== undefined) controller.dryRunDelay = dryRunDelay;

    await controller.save();

    res.json({ message: "Settings updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const togglePump = async (req, res) => {
  try {
    const { controllerId } = req.body;
    const controller = await Device.findById(controllerId);

    if (!controller)
      return res.status(404).json({ error: "Controller not found" });
    if (controller.owner.toString() !== req.user._id)
      return res.status(403).json({ error: "Unauthorized" });

    controller.pumpStatus = !controller.pumpStatus;
    await controller.save();

    const log = new Log({
      user: req.user._id,
      controller: controller._id,
      action: `Pump turned ${controller.pumpStatus ? "ON" : "OFF"}`,
    });
    await log.save();

    res.json({
      message: `Pump is now ${controller.pumpStatus ? "ON" : "OFF"}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


