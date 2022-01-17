const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const effectsSchema = new Schema(
    {
      name: { type: String, required: true, trim: true },
      model: { type: String, trim: true },
    },
    {
      timestamps: true,
    }
  );


  const Effect = mongoose.model("effects", effectsSchema);

  module.exports = Effect;