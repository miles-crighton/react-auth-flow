const express = require('express');
const path = require('path');
const app = express();

var apiRouter = require('./routes/api');

const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

require('dotenv').config()
//const envfile = require('envfile');

//Import the mongoose module
var mongoose = require('mongoose');

const dbUser = process.env.MONGODB_USER
const dbPass = process.env.MONGODB_PASS

console.log(dbUser, dbPass)

//Set up default mongoose connection
var mongoDB = `mongodb+srv://${dbUser}:${dbPass}@cluster0-nshbm.gcp.mongodb.net/react-auth?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

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

app.get('/read_cookie', (req, res) => {
    if (req.signedCookies.name) {
        res.send({ screen: req.signedCookies.name });
    } else {
        res.send({ screen: 'auth' });
    }
});

app.get('/clear_cookie', (req, res) => {
    res.clearCookie('name').end();
});

app.get('/get_user_data', (req, res) => {
    if (req.signedCookies.name) {
        res.send({ user: req.signedCookies.name, data: [1, 2, 3] })
    }
});

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../client/build/index.html'));
});