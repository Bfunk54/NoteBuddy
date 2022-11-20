const notes = require("express").Router();
const fs = require( 'fs' );

notes.get('/', (req, res) => {
  readFromFile('/db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;