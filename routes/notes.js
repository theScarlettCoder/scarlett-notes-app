const express = require("express");
const mongoose = require("mongoose");
const noteModel = require("../models/noteModel");
const router = express.Router();

// CREATE NOTE
router.post("/", async (req, res) => {
  const newNote = new noteModel(req.body);

  try {
    let error = [];

    noteModel.findOne({ title: req.body.title }).then((valid) => {
      if (valid) {
        error.push({
          message: "Title already exists",
        });
        res.status(400).json({ message: "Another note has thesame title" });
      }
    });
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create Note",
      error: error.message,
    });
  }
});

// UPDATE NOTE
router.put("/:id", async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (note.username === req.body.username) {
      try {
        const updatedNote = await noteModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedNote);
      } catch (error) {
        res.status(400).json({
          message: "Failed to update Note",
          error: error.message,
        });
      }
    } else {
      res.status(401).json({
        message: "You can only edit a note you posted",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Note not found",
      error: error.message,
    });
  }
});

// DELETE NOTE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await noteModel.findById(id);

    console.log("Note:", note.username);
    console.log("body:", req.body);

    if (note.username === req.body.username) {
      try {
        const deleteNote = await note.delete();
        res.status(200).json({
          message: "Note has been deleted successfully",
          deletedNote: deleteNote,
        });
      } catch (error) {
        res.status(400).json({
          message: "Deleting not was unsuccessful",
          error: error.message,
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized deletion, You can delete only your note",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Note not found",
      error: error.message,
    });
  }
});

// GET NOTE
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await noteModel.findById(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Note does not exist",
      error: error.message,
    });
  }
});

// GET NOTES
router.get("/", async (req, res) => {
  const username = req.query.user;

  try {
    let notes;
    if (username) {
      notes = await noteModel.find({
        username,
      });
    } else {
      notes = await noteModel.find();
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({
      message: "No Notes Found",
      error: error.message,
    });
  }
});

module.exports = router;
