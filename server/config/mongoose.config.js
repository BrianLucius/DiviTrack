const mongoose = require("mongoose");
const database = "divitracker_db";

mongoose.connect(`mongodb://localhost/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established a connection to the database: ${database}`))
    .catch(err => console.log(`Something went wrong when connecting to the database: ${database} `, err));
