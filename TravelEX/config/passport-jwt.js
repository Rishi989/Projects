// const passport = require('passport');

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const User = require('../modal/user');

// let opts = {
//     jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrkey : "rishi"
// }


// passport.use( new JwtStrategy(opts, function(jwtPayload){
//     User.findById(jwtPayload._id, function(err){
//         if(err){
//             console.log("error in finding user",err);
//             return deleteOne(err);
//         }
//         if(user){
//             return done(null,user);
//         }else{
//             return done(null,false);
//         }
//     })
// }))


// module.exports = passport;