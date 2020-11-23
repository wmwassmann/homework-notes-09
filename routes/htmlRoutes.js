// DEPENDANCIES

const path = require("path");


// Handles the HTML GET and defaults to index.html
module.exports = function(app) {
app.get("/notes", (req, res) => {
  res.sendFile(path.join(
    __dirname, "../public/notes.html"
    ));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(
    __dirname, "../public/index.html"
    ));
});
};
