const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport')

const MongoStore = require('connect-mongo');
const session = require('express-session');
var cookieParser = require('cookie-parser');


const port = 8080;
const app = express();

app.use(express.static('./assests'));
app.use('/upload',express.static(__dirname+'/upload'));
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(cookieParser('secret'));
app.use(session({
    name : 'Own-sheet',
    secret : 'urvashirathore',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl:'mongodb://localhost/social-media',
        autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'OK');
        }
    )
}))
//////////Passport-MW////////////

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthenticatedUser);


app.use('/', require('./routers'));
app.use('/sign-in',require('./routers'));
app.use('/sign-up',require('./routers'));
app.use('/create/sign-up',require('./routers'));
app.use('/create/sign-in',require('./routers'));
app.use('/create-question',require('./routers'));
app.use('/sign-out',require('./routers'));
app.use('/create-topic',require('./routers'));










app.listen(port,function(err){
    if(err){
        console.log('Error in starting server',err);
        return;
    };
    console.log('Server is Succesfully connected',port);
})
