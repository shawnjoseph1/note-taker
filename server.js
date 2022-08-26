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

// api routing 
function createNewNote(body, notesArray) {
  console.log(body);
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

  app.post("/api/notes", (req, res) => {  
    const note = req.body; 
    readFile("./Develop/db/db.json", 'utf-8').then((data) => { 
    const notes = [].concat(JSON.parse(data)); 
    note.id = notes.length + 1;
    notes.push(note);
    return notes;
    }).then((notes) => {
      writeFile("./Develop/db/db.json", JSON.stringify(notes));
      res.json(notes);
    })
  });

app.delete('/api/notes/:id', (req, res) =>{ //delete note
const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./Develop/db/db.json"))); //read db.json file
const delNote = notes.filter(rmvNote => rmvNote.id !== req.params.NoteId); //filter out the note to be deleted
fs.writeFileSync("./Develop/db/db.json", JSON.stringify(delNote)); //write to db.json file
res.json(delNote); //send back the updated notes array
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