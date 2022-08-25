const fs = require("fs");
const path = require("path");
const express = require("express");
const notes = require("./Develop/db/db.json");


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(express.static("public")); // for serving static files

app.get("/api/notes", (req, res) => { //get all notes
  res.sendFile(path.join(__dirname, "./db/db.json"));  //send all notes
});


app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json")); //get all notes from db.json file
  const newNotes = req.body; 
  newNotes.id = notes.length + 1; //set new note id
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes)); //write new note to db.json
  res.json(notes)
});

app.delete('/api/notes/:NoteId', (req, res) =>{ //delete note
const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"))); //read db.json file
const delNote = notes.filter(rmvNote => rmvNote.id !== req.params.NoteId); //filter out the note to be deleted
fs.writeFileSync("./db/db.json", JSON.stringify(delNote)); //write to db.json file
res.json(delNote); //send back the updated notes array
})

// server statistics
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function () {
  console.log("App is now on PORT" + PORT);
});