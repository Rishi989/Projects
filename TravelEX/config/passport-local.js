const passport  = require('passport');
const localStratagy = require('passport-local').Strategy;
const User = require('../modal/user');


passport.use(new localStratagy({
    usernameField:'email',
    passReqToCallback:true,    
},
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding email ',err);
                return done(err);
            }if(!user || user.password != password){
                req.flash('error','incorrect username/password');
                // console.log("password or email is incorrect");
                // alert("password or email is incorrect");
                return done(null,false);
            }return done(null,user);
        })
    }
));

passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding email ',err);
            return done(err);
        }return done(null,user);
    })
})


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }return res.redirect('/sign-in');
}

passport.SetAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        
        res.locals.user = req.user;
        
    }next();;
}


module.exports=passport;