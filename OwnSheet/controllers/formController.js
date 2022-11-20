const User = require('../modal/user');
const Topic = require('../modal/topic');
const Questions = require('../modal/questions');
module.exports.signUp = async function(req,res){
    try {
        const user = await User.findOne({email : req.body.email})
        console.log("into sign up");
        if(user == null){ 
            console.log("user not found");
            await User.create({
                name : req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            return res.redirect('/');
        }else{
            console.log("user found");
            return res.redirect('back');
        }
    } catch (error) {
        
        return res.redirect('back');
    }


    
    
          
    
}

module.exports.signIn = function(req,res){
    return res.redirect('/');
    
    
}
module.exports.signOut = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error in logout",err);
            return;
        }
        return res.redirect('/sign-in');
    });
        
}

module.exports.createTopic = async function(req,res){
    try {
        const user = await User.findById(req.query.id);
        const topic = await Topic.create({
            user : req.query.id,
            content: req.body.content, 
        })
        user.topics.push(topic);
        user.save();
        console.log("topic crated",topic);
        return res.redirect('back');

    } catch (error) {
        console.log("error in creating topic",error);
        return res.redirect('back');
    }

}

module.exports.createQuestion = function(req,res){
    console.log(req.query.id);
    Topic.findById(req.query.id,function(err,topic){
        if(err){
            console.log("error in finding topic",err);
            return 
        }
        Questions.create({
            content : req.body.content,
            link : req.body.link,
            topic : req.body.topic

        },function(err,ques){
            if(err){
                console.log("error in creating ques",err);
                return ;
            }topic.questions.push(ques);
            topic.save();
            console.log("question created",ques);
            return res.redirect('back');
        })
    })
}