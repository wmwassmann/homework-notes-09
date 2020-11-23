
// Dependency Express and creating an Express server.

const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express"); 
const app = express();


// Sets an initial port
const PORT = process.env.PORT || 3305;

// App.use allows us to use the express NPM package which handles server
// startup and responses. The static setting allows us to use images, CSS files,
// and JavaScript files.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routing locations
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



// Server startup through port 3000
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
