const {set, connect , connection} = require('mongoose');
require('dotenv').config();

set('toJSON',{virtuals: true, getters: true});

connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('Connected to database');

module.exports = connection;