const mongoose = require('mongoose');
const User = require('./user');
const postSchema = new mongoose.Schema({
    content:{
        type: String
    },
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
    }
},{
    timestamps:true
})

const Post = mongoose.model('Posts',postSchema);

module.exports = Post;