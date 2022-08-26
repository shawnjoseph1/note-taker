// used https://www.youtube.com/watch?v=Qo71smMMQBc&t=132s as reference/help 
const fs = require("fs"); 
const path = require("path");
const express = require("express");



const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(express.static("./Develop/public")); 

app.get("/api/notes", (req, res) => { // get the notes from the notes.json file
  res.sendFile(path.join(__dirname, "./Develop/db/db.json")) // send the notes.json file
}); 


app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  const newNotes = req.body;
  req.body.id = notes.length.toString();
  notes.push(newNotes);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes))
  res.json(notes);
});

// // delete route for the notes.json file and deletes the note with the matching id from the notes.json file 

app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  const id = req.params.id;
  const newNotes = notes.filter(note => note.id !== id);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(newNotes));
  res.json(newNotes);
} );

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