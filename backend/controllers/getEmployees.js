const User = require("../models/user");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({});
    res.status(200).json({ status: "ok", data: employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Error getting employees" });
  }
};

module.exports = {
  getEmployees,
};