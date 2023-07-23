const excavator = require("../models/excavator");

const createExcavator = async (req, res) => {
  console.log("createExcavator");
  try {
    const { name, contact, vehicle, shift, date, startTime } = req.body;

    console.log(req.body);

    const newExcavator = new excavator({
      name,
      contact,
      vehicle,
      shift,
      date,
      startTime,
    });

    const savedExcavator = await newExcavator.save();

    console.log(savedExcavator);

    res.status(200).json({
      status: "ok",
      excavator: savedExcavator,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: "Error creating excavator",
    });
  }
};

module.exports = {
  createExcavator,
};
