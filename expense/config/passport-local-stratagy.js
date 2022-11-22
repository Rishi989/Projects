const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');


passport.use(new LocalStrategy({
    usernameField : 'email'},////////////////// usually unique property is set as usernamefield.
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("error in finding user",err);
                return done(err); 
            }if(!user || user.password != password){
                console.log('username/password is incorrect');
                return done(null,false);
            }return done(null,user);
        })
    }
));
/////////// serializing the user's id as token/key

passport.serializeUser(function(user,done){
    done(null,user.id);
});

////////// deserailizing get user from the given key (identitying the user)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user",err);
            return done(err); 
        }return done(null,user);
    })
});


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }return res.redirect('/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;  
    }
     next();
}

module.exports = passport;