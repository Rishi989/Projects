const User = require('../modal/user');


module.exports.signUp = async function(req,res){
    try {
        const user = await User.findOne({email : req.body.email})

        if(user == null){ 
            
            await User.create({
                name : req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            req.flash("success", "successfuly Signed up");
            return res.redirect('/');
        }else{
            
            req.flash('error','email address already exist');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }


    
    
          
    
}

module.exports.signIn = function(req,res){
    req.flash("success", "SuccessFully Logged in");
    return res.redirect('/profile');
    
    
}
module.exports.signOut = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error in logout",err);
            return;
        }req.flash('success','You have log Out')
        return res.redirect('/');
    });
        
}