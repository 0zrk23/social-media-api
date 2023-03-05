const {connect , connection} = require('mongoose');
require('dotenv').config();

connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;