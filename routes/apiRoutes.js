
// DEPENDANCIES 

const fs = require('fs');
const path = require('path');
const data = require(path.join(__dirname, '../db/db.json'));

// we are going to be making API calls from this file and storing into the db.json
module.exports = function (app) {
  app.get('/api/notes', (req, res) => {

    res.json(data);
  });

  app.post('/api/notes', (req, res) => {
    const note = req.body;

    note.id = Math.ceil(Math.random() * 999);

    data.push(note);
    res.json(note);
    // writes the pushed object into the db.json
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data), null, 2);
  });



  app.delete('/api/notes/:id', (req, res) => {
    const locateId = parseInt(req.params.id);

    function locate() {

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === locateId) {
          data.splice(i, 1);
          // writes the pushed object into the db.json
          fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data), null, 2);

          res.json(data);
        }
      }
    }
    locate();
  });
};



