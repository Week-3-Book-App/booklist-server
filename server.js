'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.use(cors());

app.get('/books', (req, res) => {
  client.query(`SELECT * from books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// PORT=3000
// CLIENT_URL=http://localhost:8080

// Mac:
// DATABASE_URL=postgres://localhost:5432/book_app

// Windows:
// DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/book_app