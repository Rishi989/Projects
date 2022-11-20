const express = require('express');
const Topic = require('../modal/topic');
const User = require('../modal/user');
const passport = require('passport');
const passportLocal = require('../config/passport'); 

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('sign-in');
    
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){

        return res.redirect('/');
    }
     res.render('sign-up');
}




// HERE WE HAVE TO CREATE THE ROUTERS FOR THE HOME PAGE
module.exports.profile = async function(req,res){
    try {
        let user = await User.findById(req.user.id)
        .sort('-createdAt')
        .populate({
            path:'topics',
            populate:{
                path:'questions',
            }
        }).exec();
        console.log("user details",user);
        
        
        return res.render('Sde-sheet',{
            user : user,
//            
        })

    } catch (error) {
        console.log("error in finding post",error);
        return;
    }
    
}

