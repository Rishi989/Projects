const express = require('express')
const path = require('path');
const passport = require('passport')
const localPassport = require('../config/passport-local');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');
const formController = require('../controllers/formController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const likeController = require('../controllers/likeController');



////////////USER MULTER EXPREIMENT/////////
const profilePath = path.join('/upload/users/profileImage');
const backgroundImagePath = path.join('/upload/users/backgroundImage')
const postImagePath = path.join('/upload/users/postimages')
const multer = require('multer');


let profileStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',profilePath));
    },filename: function(req,file,cb){
        let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    } 
})

let backStorage =   multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',backgroundImagePath));
    },filename: function(req,file,cb){
        let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    } 
})
 let postStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',postImagePath))
    },filename: function(req,file,cb){
        let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
 })

const uploadPost = multer({storage:postStorage});
const uploadProfile = multer({storage:profileStorage});
const uploadBackground = multer({storage:backStorage});

////////////////// USER PROFILE ID ////////////////////

router.get('/user-profile',userController.profileUser);
router.post('/profileImage',uploadProfile.single('profile'),userController.profileImage);
router.post('/backgroundImage',uploadBackground.single('background'),userController.backgroundImage);


///////////////Sign IN and Sign-out//////////////



console.log('router loaded');
router.get('/',homeController.signIn);
router.get('/sign-in',homeController.signIn);
router.get('/sign-up',homeController.signUp);
router.post('/create/sign-up',formController.signUp);
router.post('/create/sign-in',passport.authenticate(
'local',{failureRedirect:'/sign-in',failureFlash: true,}
),formController.signIn);



/////////////// Post/////////////////////
router.get('/profile',passport.checkAuthentication,homeController.profile);
router.get('/sign-out',formController.signOut);
router.post('/create-post',uploadPost.single('postImage'),postController.createPost);
router.get('/delete-post',postController.deletePost);

/  ///////////////////Comment///////////
router.get('/comment',postController.commentPage);
router.post('/comment-create',postController.commentCreate);
router.get('/comment-delete',postController.deleteComment);


/////// Like ////////
router.get('/create-like',likeController.createLike);


///////// API//////
router.use('/api',require('./api'));


module.exports = router;

