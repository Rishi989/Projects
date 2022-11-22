const express = require('express');
const Post = require('../modal/post');
const User = require('../modal/user');
const passport = require('passport');
const passportLocal = require('../config/passport-local'); 

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }

    return res.render('sign-in');
    
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){

        return res.redirect('/profile');
    }
     res.render('sign-up');
}

module.exports.profile = async function(req,res){
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
        }).populate({
            path: 'likes'
        })
        .exec();
        
        
        let users = await User.find({});
        
        return res.render('profile',{
            posts : posts,
            title : 'Profile',
            users : users,
        })

    } catch (error) {
        console.log("error in finding post",error);
        return;
    }

    
}

