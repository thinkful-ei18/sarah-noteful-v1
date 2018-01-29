'use strict';

const express = require('express')

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));

console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...

app.get('/v1/notes', (req, res) => {
  const {searchTerm} =req.query;
  let searchNotes = searchTerm ? data.filter(note => note.title.includes(searchTerm)) : data;

  res.json(searchNotes);
});

app.get('/v1/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = data.find(note => note.id === id);
  res.json(note);
})

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});