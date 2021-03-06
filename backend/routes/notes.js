const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

//ROUTER 1: Get All the Notes using: GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

})

//ROUTER 2: Add a new note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description length must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            //If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }

    })

//ROUTER 3: Update an existing note using: PUT "/api/auth/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

})

//ROUTER 4: Delete an existing note using: DELETE "/api/auth/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;