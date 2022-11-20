const mongoose = require('mongoose');
const User = require('./user');
// const multer = require('multer');

const questionSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    link:{
        type:String,

    },
    
    topic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Topic'
    }
},{
    timestamps:true
})

const Questions = mongoose.model("Questions",questionSchema);

module.exports = Questions;