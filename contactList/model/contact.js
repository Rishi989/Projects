const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:'string',
        required:true
    },
    phone:{
        type : 'string',
        required:true
    }
})

const Contacts = mongoose.model('Contacts',contactSchema);

module.exports = Contacts;