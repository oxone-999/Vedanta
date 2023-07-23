const idleHours = require("../models/idleHours");

const getIdleHours = async (req, res) => {
  console.log("getIdleHours");
  try {
    const idleHoursList = await idleHours.find({});

    console.log(idleHoursList);

    res.status(200).json({
      status: "ok",
      idleHours: idleHoursList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: "Error getting idleHours",
    });
  }
};

module.exports = {
  getIdleHours,
};
