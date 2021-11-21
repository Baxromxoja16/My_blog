const { Schema, model } = require("mongoose");

const TextSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = model("text", TextSchema);
