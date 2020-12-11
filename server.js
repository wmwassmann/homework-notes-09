
// Dependency Express and creating an Express server.
const express = require("express"); 
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();
// Sets an to 3306 local
const PORT = process.env.PORT || 3305;

// App.use allows us to use the express NPM package which handles server
// startup and responses. The static setting allows us to use images, CSS files,
// and JavaScript files.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('docs'));


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// Listening through server 3305
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
