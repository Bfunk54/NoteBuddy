const note = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./fsUtils");

note.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

note.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Could not add Note");
  }
});

module.exports = note;
