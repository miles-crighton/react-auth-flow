const express = require('express');
const path = require('path');
const app = express();

const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

const auth = basicAuth({
    users: {
        admin: '123',
        user: '456',
    },
});

const PORT = 5000 || process.env.PORT;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(require("body-parser").json());

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.use(
    express.static(path.join(__dirname, '../client/build'))
).listen(
    PORT, () => console.log(`Listening on ${PORT}`)
);

app.get('/authenticate', auth, (req, res) => {
    const options = {
        httpOnly: true,
        signed: true
    }

    if (req.auth.user === 'admin') {
        res.cookie('name', 'admin', options).send({ screen: 'admin' });
    } else if (req.auth.user === 'user') {
        res.cookie('name', 'user', options).send({ screen: 'user' });
    }
});

app.get('/read_cookie', (req, res) => {
    if (req.signedCookies.name === 'admin') {
        res.send({ screen: 'admin' });
    } else if (req.signedCookies.name === 'user') {
        res.send({ screen: 'user' });
    } else {
        res.send({ screen: 'auth' });
    }
});

app.get('/clear_cookie', (req, res) => {
    res.clearCookie('name').end();
});

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../client/build/index.html'));
});