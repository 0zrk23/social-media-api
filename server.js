const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')
const {set} = require('mongoose');

set('toJSON',{virtuals: true, getters: true});

// const cwd = process.cwd();

const PORT = 3001
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Now Listening`)
    });
});