const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//mongoose
const mongoose = require("mongoose");

app.use(cookieParser());
//app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/portfolio.routes")(app);
require("./routes/dividend.routes")(app);

app.listen( port, () => console.log(`Listening on port: ${port}`));
