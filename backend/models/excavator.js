const mongoose = require("mongoose");

const excavatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Excavator = mongoose.model("Excavator", excavatorSchema);

module.exports = Excavator;

