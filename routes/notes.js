// Require the necessary packages for this routing section of the app
const note = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");
const uuid = require("./helpers/uuid");

// GET Route putting all notes in the database on the page
note.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route to create a new note and add it to the database
note.post("/", (req, res) => {
  // Put the items in the request body into their own variables
  const { title, text } = req.body;

  // If both a title and text has been input then create a new note object
  if (title && text) {
    const note = {
      title: title,
      text: text,
      id: uuid(),
    };

    // Read the database file and append the new note to the array
    readAndAppend(note, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Could not add Note");
  }
});

// DELETE Route to delete a note from the database
note.delete("/:id", (req, res) => {
  // Put the id of the note to be deleted in a variable
  const note_id = req.params.id;

  // Read the database file and parse the JSON
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))

    // Filter out the note with the id that was passed in the URL
    .then((json) => {
      const result = json.filter((note) => note.id !== note_id);

      // Write the new array without the deleted note to the database
      writeToFile("./db/db.json", result);

      res.json(`${note_id} has been deleted from the database`);
    });
});

module.exports = note;
