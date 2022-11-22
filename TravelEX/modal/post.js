const mongoose = require('mongoose');
const User = require('./user');
const multer = require('multer');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
    postImage :{
        type:String,
    }
},{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema);

module.exports = Post;