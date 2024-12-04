const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
});

const DataModel = mongoose.model("Data", DataSchema);

module.exports = DataModel;
