const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, unique: true, max: 50 },
  task: { type: String, trim: true },
  type: { type: String },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = { Note };
