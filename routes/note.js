const express = require("express");
const router = express.Router();
const { Note } = require("../models/Note");

/* GET Get all notes */
router.get("/getAll", (req, res) => {
  Note.find()
    .then((allNotes) => res.status(200).json({ success: true, allNotes }))
    .catch((err) => res.json({ success: false, err }));
});

/* POST Create Note */
router.post("/create", (req, res) => {
  const note = req.body;
  Note.create(note)
    .then((note) => res.status(200).json({ success: true, note }))
    .catch((err) => res.json({ success: false, err }));
});

/* PUT update note. */
router.put("/update", (req, res) => {
  Note.findOneAndUpdate({ _id: req.body.noteId }, req.body.note, { new: true })
    .then(note => res.status(200).json({ success: true, note }))
    .catch((err) => res.json({ success: false, err }));
});

/* DELETE home page. */
router.delete("/delete/:id", (req, res) => {
  Note.findOneAndDelete({ _id: req.params.id })
    .then(deletedDoc => 
      res.status(200).json({ success: (deletedDoc ? true : false) }))
    .catch((err) => res.json({ success: false, err }));
});

module.exports = router;
