const express = require('express');
const path = require('path');
const app = express();

const apiRouter = require('./routes/api');

const cookieParser = require('cookie-parser');

require('dotenv').config()
//const envfile = require('envfile');

//Import the mongoose module
const mongoose = require('mongoose');

const dbUser = process.env.MONGODB_USER
const dbPass = process.env.MONGODB_PASS

//Set up default mongoose connection
var mongoURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0-nshbm.gcp.mongodb.net/react-auth?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("body-parser").json());

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.use(
    express.static(path.join(__dirname, '../client/build'))
).listen(
    PORT, () => console.log(`Listening on ${PORT}`)
);

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../client/build/index.html'));
});