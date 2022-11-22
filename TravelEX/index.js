const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local')
const passportJwt = require('./config/passport-jwt');
const MongoStore = require('connect-mongo');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const flashMiddleware = require('./config/middle');
const Noty = require('noty');

const port = 8000;
const app = express();

//// Socket/io//////////

const chatServer = require('http').Server(app);
const chatSocket = require('./config/Server_chat_socket').chatSockets(chatServer); 
chatServer.listen(5000);


////////////////////////////


app.use(express.static('./assets'));
app.use('/upload',express.static(__dirname+'/upload'));
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




//////////////SESSION//////////////////////////
app.use(cookieParser('secret'));
app.use(session({
    name : 'social-media',
    secret : 'rishirajrathore',
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
app.use(flash());
app.use(flashMiddleware.setFlash);

////////////////////////////////////////////////////////




app.use('/', require('./routers'));
app.use('/sign-in',require('./routers'));
app.use('/user/sign-up',require('./routers'));
app.use('/create/sign-up',require('./routers'));
app.use('/create/sign-in',require('./routers'));
app.use('/profile',require('./routers'));
app.use('/sign-out',require('./routers'));
app.use('/create-post',require('./routers'));
app.use('/comment',require('./routers'));
app.use('/comment-create',require('./routers'));

app.use('/delete-post',require('./routers'));
app.use('/comment-delete',require('./routers'));
app.use("/user-profile", require('./routers'));
app.use('/profileImage',require('./routers'));
app.use('/backgroundImage',require('./routers'));
app.use('/create-like',require('./routers'));


//////////////////////
app.listen(port,function(err){
    if(err){
        console.log('Error in starting server',err);
        return;
    };
    console.log('Server is Succesfully connected',port);
})
