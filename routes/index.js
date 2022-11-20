// Require express
const express = require("express");


// Import our modular routers for /notes
const notesRouter = require("./api/notes");

const app = express();

app.use('./api/notes', notesRouter);

module.exports = app;
