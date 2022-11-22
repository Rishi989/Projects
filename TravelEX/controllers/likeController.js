const Like = require('../modal/like');
const Post =require('../modal/post');
const Comment = require('../modal/comment');

///// in the like url we are taking ID and Type (POST and Comment);
module.exports.createLike = async function(req,res){
    //// '/create-like?id=""&type="post/comment"////
    
    
    let likeable;

    if(req.query.type == 'Post'){
        likeable = await Post.findById(req.query.id);
    }else if(req.query.type == 'Comment'){
        likeable = await Comment.findById(req.query.id);
    }

    //// if like exist then delete the like from respective post/comment////
    let existLike = await Like.findOne({
        likeable : req.query.id,
        onModal : req.query.type,
        user : req.user._id,
    })

    if(existLike){
        likeable.likes.pull(existLike._id);
        likeable.save();

        existLike.remove();
    }
    //// if it doesn't exist then create it/////
    else{
        let like = await Like.create({
            likeable : req.query.id,
            onModal : req.query.type,
            user : req.user._id,
        });
        likeable.likes.push(like);
        likeable.save();


    }
    

    return res.redirect('back');

}