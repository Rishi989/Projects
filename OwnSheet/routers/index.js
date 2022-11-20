const express = require('express')
const path = require('path');
const passport = require('passport')
const localPassport = require('../config/passport');
const router = express.Router();



const homeController = require('../controllers/home_controller.js');
const formController = require('../controllers/formController');




console.log('router loaded');

router.get('/sign-in',homeController.signIn);
router.get('/sign-up',homeController.signUp);
router.post('/create/sign-up',formController.signUp);
router.post('/create/sign-in',passport.authenticate(
'local',{failureRedirect:'/sign-in'}
),formController.signIn);

router.get('/',passport.checkAuthentication,homeController.profile);
router.get('/sign-out',formController.signOut);


router.post('/create-topic',formController.createTopic);
router.post('/create-question',formController.createQuestion);

module.exports = router