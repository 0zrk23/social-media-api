const {connect , connection} = require('mongoose');
require('dotenv').config();

connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('Connected to database');

module.exports = connection;