const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
let corsOptions = {
    origin: "http://localhost:8081"
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = require("./app/models");

db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and Resync Db");
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/movie.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
