const mongoose = require('mongoose');
const User = require('./user');
// const multer = require('multer');

const topicSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Questions'
    }]
    
},{
    timestamps:true
})

const Topic = mongoose.model("Topic",topicSchema);

module.exports = Topic;