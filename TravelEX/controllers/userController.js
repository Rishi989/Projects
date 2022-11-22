
const User = require('../modal/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const profilePath = path.join('/upload/users/profileImage');
const backgroundPath = path.join('/upload/users/backgroundImage');

module.exports.profileUser = async function(req,res){
    try {
        let userProfile = await User.findById(req.query.id)
        .populate({
            path : 'posts',
            populate:{
                path : 'likes',
            },
            populate:{
                path : 'comments'
            }
        });
        
        return res.render('profile-user',{
            users : userProfile,
            
        })
        
    } catch (error) {
        console.log("error in profileUser",error);
        return;
    }

}

module.exports.profileImage =  function(req,res){
    User.findById(req.query.id,function(err,user){
        if(err){
            console.log("error in finding the user in profileImage",err);
            return;
        }
        if(user.profileImage && user.profileImage != 'upload/users/default/defaultProfileImage.png' ){
        
            fs.unlinkSync(path.join(__dirname,'..',user.profileImage));
        }
        user.profileImage =  profilePath+'/'+req.file.filename;
        user.save()
        return res.redirect('back');
    })
}


module.exports.backgroundImage = function(req,res){
    User.findById(req.query.id,function(err,user){
        if(err){
            console.log("error in finding the user in Background",err);
            return;
        }if(user.backgroundImage){
            fs.unlinkSync(path.join(__dirname,'..',user.backgroundImage));
        }
        user.backgroundImage = backgroundPath+'/'+req.file.filename;
        user.save()
        return res.redirect('back');
    })
}