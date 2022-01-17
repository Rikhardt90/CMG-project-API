const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordingSchema = new Schema(
    {
      name: { type: String, required: true, trim: true },
      model: { type: String, trim: true },
    },
    {
      timestamps: true,
    }
  );


  const Recording = mongoose.model("recording", recordingSchema);

  module.exports = Recording;