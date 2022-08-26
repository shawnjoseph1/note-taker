
const fs = require("fs"); 
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { readFile } = require('fs/promises');
const { writeFile } = require('fs/promises');


app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(express.static("public")); // for serving static files

// api routing 
app.get('/api/notes', (req, res) => { 
  readFile('C:/Users/shawn/notetaker/Develop/db/db.json', 'utf-8').then((data) => {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  })});

  app.post('/api/notes', (req, res) => {  
    const note = req.body; 
    readFile('C:/Users/shawn/notetaker/Develop/db/db.json', 'utf-8').then((data) => { 
    const notes = [].concat(JSON.parse(data)); 
    note.id = uuidv4();
    notes.push(note);
    return notes;
    }).then((notes) => {
      writeFile('C:/Users/shawn/notetaker/Develop/db/db.json', JSON.stringify(notes));
      res.json(notes);
    })
  });

app.delete('/api/notes/:id', (req, res) =>{ //delete note
const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "C:/Users/shawn/notetaker/Develop/db/db.json"))); //read db.json file
const delNote = notes.filter(rmvNote => rmvNote.id !== req.params.NoteId); //filter out the note to be deleted
fs.writeFileSync("C:/Users/shawn/notetaker/Develop/db/db.json", JSON.stringify(delNote)); //write to db.json file
res.json(delNote); //send back the updated notes array
})

// routing for the index.html files
app.get('/', (req, res) => {
  res.sendFile('C:/Users/shawn/notetaker/Develop/public/index.html');
  })

app.get('*', (req, res) => {
  res.sendFile('C:/Users/shawn/notetaker/Develop/public/notes.html');
  })

app.get('/notes', (req, res) => {
  res.sendFile('C:/Users/shawn/notetaker/Develop/public/notes.html');
  })

app.listen(port, () => {
  console.log(`App is now on PORT ${port}`);
});