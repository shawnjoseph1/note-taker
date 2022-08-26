// used https://www.youtube.com/watch?v=Qo71smMMQBc&t=132s as reference/help 
const fs = require("fs"); 
const path = require("path");
const express = require("express");
const { notes } = require("./Develop/db/db.json");


const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(express.static("./Develop/public")); 


function createNewNote(body, notesArray) { // create a new note
  console.log(body); // log the body of the note to the console
  const note = body; // create a new note object
  notesArray.push(note); // push the note to the notes array
  fs.writeFileSync( // write the new note to the notes.json file
    path.join(__dirname, "./db/db.json"), // join the path to the db.json file
    JSON.stringify({ notes: notesArray }, null, 2) // stringify the notes array and indent it by 2 spaces
  );

  return note; // return the note
}

app.get("/api/notes", (req, res) => { // get the notes from the notes.json file
  res.sendFile(path.join(__dirname, "./Develop/db/db.json")) // send the notes.json file
}); 


app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  const newNotes = req.body;
  notes.push(newNotes);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes))
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  res.json(delNote);
})

// routing for the html files
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});


app.listen(port, function() { 
  console.log("App is now on PORT" + port);
});