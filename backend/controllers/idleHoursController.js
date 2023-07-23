const idleHours = require("../models/idleHours");

const createIdleHours = async (req, res) => {
  console.log("createIdleHours");
  try {
    const { name, reason, time, shift, date } = req.body;

    console.log(req.body);

    const newIdleHours = new idleHours({
      name,
      reason,
      time,
      shift,
      date,
    });

    const savedIdleHours = await newIdleHours.save();

    console.log(savedIdleHours);

    res.status(200).json({
      status: "ok",
      idleHours: savedIdleHours,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: "Error creating idleHours",
    });
  }
};

module.exports = {
  createIdleHours,
};
