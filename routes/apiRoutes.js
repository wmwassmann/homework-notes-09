
// DEPENDANCIES 

const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require(path.join(__dirname, '../db/db.json'));
const methodOverride = require('method-override');

// I also cleaned up my code a bit.  Upon doing some research I found that I like the Router method more than the module.exports function.
// It feels cleaner especially when considering React usage, as it appears that Router would be better for a multiple module application.
// we are going to be making API calls from this file and storing into the db.json
  router.get('/notes', (req, res) => {
    res.json(db);
  });


  router.post('/notes', (req, res) => {
    const note = req.body;
    // creates a random id for the note
    note.id = Math.ceil(Math.random() * 999);

    db.push(note);
    res.json(note);
    // writes the pushed object into the db.json
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db), null, 2);
  });

  router.put('/notes/:id', (req, res) => {
    const note = req.body;

    if (!note) return res.status(404).json({});
    
    note.title = req.body.title
    res.json(note)
  })


  router.delete('/notes/:id', (req, res) => {
    const locateId = parseInt(req.params.id);

    function locate() {

      for (let i = 0; i < db.length; i++) {
        if (db[i].id === locateId) {
          db.splice(i, 1);
          // writes the pushed object into the db.json
          fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db), null, 2);

          res.json(db);
        }
      }
    }
    locate();
  });

  module.exports = router;



