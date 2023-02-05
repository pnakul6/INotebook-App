const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Notes');

const router = express.Router();
//ROUTE 1 :- getting a users notes GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
   }
})

//ROUTE 2 :- Add a users notes POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
   body('title', 'enter a valid title').isLength({ min: 3 }),
   body('description', 'enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
   try {
      //destructuring title desc etc
      const { title, description, tag } = req.body;
      //check for error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const saveNote = await note.save();
      res.json(saveNote);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
   }
})
//ROUTE 3 :- Update a users notes PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   //create a new note object
   try {
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      //find note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json({ note });
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
   }
})

//ROUTE 4 :- Delete a users notes PUT "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
      //find note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      //if the user is not valid send error
      if (!note) {
         return res.status(404).send("Not Found");
      }
      //if user does not own the note dont allow to delete
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ "success": "Note deleted", note: note });
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
   }
})
module.exports = router;