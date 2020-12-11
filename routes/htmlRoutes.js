// DEPENDANCIES

const path = require("path");
const router = require('express').Router();

// I also cleaned up my code a bit.  Upon doing some research I found that I like the Router method more than the module.exports function.
// It feels cleaner especially when considering React usage, as it appears that Router would be better for a multiple module application.
// Handles the HTML GET and defaults to index.html

router.get("/notes", (req, res, next) => {
  res.sendFile(path.join(
    __dirname, "..homework-notes-09/docs/notes.html"
    ));
});

router.get("*", (req, res, next) => {
  res.sendFile(path.join(
    __dirname, "../docs/index.html"
    ));
});

module.exports = router;
