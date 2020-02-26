const express = require('express');
const path = require('path');
const app = express();

const basicAuth = require('express-basic-auth');

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

app.use(
    express.static(path.join(__dirname, '../client/build'))
).listen(
    PORT, () => console.log(`Listening on ${PORT}`)
);

app.get('/authenticate', auth, (req, res) => {
    if (req.auth.user === 'admin') {
        res.send('admin');
    } else if (req.auth.user === 'user') {
        res.send('user');
    }
});

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../client/build/index.html'));
});