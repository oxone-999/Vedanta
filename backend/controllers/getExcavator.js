const excavator = require("../models/excavator");

const getExcavator = async (req, res) => {
  try {
    const excavators = await excavator.find({});
    res.status(200).json({
      status: "ok",
      excavators: excavators,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: "Error getting excavator",
    });
  }
};

module.exports = {
  getExcavator,
};
