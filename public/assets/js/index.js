
// CONST for buttons to hook into the classes.

const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// This tracks whatever note is active.
let activeNote = {};

// GET notes from the database
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// POST notes (save notes) to the database
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// DELETE method to delete the note from the database
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// This function renders whatever note is selected from the database list. 
// It also hides the save button.
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Retrieves whatever value (val) is in the text and title inputs, then saves (saveNote)
// into the database and then renders the note into the DOM. 
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Deletes
const handleNoteDelete = function (event) {
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();
  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Selects activeNote and then displays it in the input boxes.
const handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to empty
// User may add a new object
const handleNewNoteView = function () {
  // empties from line 11
  activeNote = {};
  renderActiveNote();
};

// If any of the text boxes are empty, hide the save button
// Else, show save button
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// This renders a list of titles, and only titles in the side-bar. Gives the option to select
// to make them activeNote
const renderNoteList = (notes) => {
  $noteList.empty();

  const noteListItems = [];

  // Returns jquery object for li with given text and delete button
  // unless withDeleteButton argument is provided as false
  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-times float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$li("No saved Notes", false));
  }

  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// calls on the get/render note function above on line 144
getAndRenderNotes();
