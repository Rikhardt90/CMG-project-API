const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instrumentSchema = new Schema(
  {
    model: { type: String, required: true, trim: true },
    img: { type: String, trim: true },
    price: { type: Number, trim: true },
    effects: [
      { type: Schema.Types.ObjectId, ref: "effects", required: true },
    ],
    recording: [
      { type: Schema.Types.ObjectId, ref: "recording", required: true },
    ],
  },
  { timestamp: true }
);

const Instrument = mongoose.model("Instruments", instrumentSchema);

module.exports = Instrument;
