const mongoose = require('mongoose');
const multer = require('multer');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    posts : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],

    profileImage :{
        type:String,
        default:'upload/users/default/defaultProfileImage.jpg'
        
    },

    backgroundImage : {
        type : String,
        default:'upload/users/default/defaultBackgroundImage.jpg'
    }
    

},{
    timestamps:true,
})






const User = mongoose.model("User",userSchema);

module.exports = User;