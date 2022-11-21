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
    const note = {
      title: title,
      text: text,
      id: uuidv4()
    };

    readAndAppend(note, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Could not add Note");
  }
});

note.delete("/:id", (req, res) => {
  const note_id = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== note_id);

      writeToFile("./db/db.json", result);

      res.json(`${note_id} has been deleted from the database`);
    });
});

module.exports = note;
