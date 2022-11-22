const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Expense'); /// last parameter is NAME of DATABASE

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('Successfully connected to the database');
});