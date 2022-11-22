const Post = require('../modal/post');
const User = require('../modal/user');
const Comment = require('../modal/comment');
const path = require('path');
const postImagePath = path.join('/upload/users/postimages')
const { localsName } = require('ejs');

module.exports.createPost = async function(req,res){
try {
    let user = await User.findById(req.query.id);
    let postObj = {};
    if(req.file){
        console.log(req.file);
        postObj.postImage = postImagePath+'/'+req.file.filename;
    }
    postObj.content = req.body.content;
    postObj.user = req.body.userId;
        
            

        
    let post = await Post.create(postObj);
    user.posts.push(post);
    user.save();

    // if(req.xhr){
    //     return res.status(200).json({
    //         data:{
    //             Post : post 
    //         },
    //         message: "Post Created!",
    //     })
    // }
        
    req.flash('success','Successfully created Post');
    return res.redirect('back');

} catch (error) {
    req.flash('error',"error in creating post");
    return res.redirect('back');
}

}
//////
module.exports.commentPage = function(req,res){
    const id = req.query.id;
    
    Post.findById(id)
    .populate('user')         ////// to access the users
    .populate({               /////// to access the comment it's not nested it's direct with Post
        path : 'comments',   ////// 
        populate:'user'     ////////////////// it's nested ;
    }).populate({
        path : 'likes',
    })
    .exec(function(err,post){
        if(err){
            req.flash('error',`error in creating post ${err}`);
            return;
        }
         return res.render('comment',{
            title:"Comments",
            posts:post,
        });
        
    })
} 

module.exports.commentCreate = function(req,res){
    /////// post is hidden input 
    Post.findById(req.body.post,function(err,post){
        if(err){console.log("error in finding post",err);return};
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user.id,
        },function(err,comment){
            if(err){
                req.flash('error',`error in creating comment ${err}`);
                return;
            
            }
            post.comments.push(comment);
            post.save();

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             Comment : comment 
            //         },
            //         message : "Successfully Created Comment!"
            //     })
            // }


            req.flash('success','Successfully created comment');
            return res.redirect('back');
        })
    })
}


module.exports.deletePost = async function(req,res){
    const id = req.query.id;
    Post.findById(id,function(err,post){
        if(err){
            console.log("error in finding post",err);
            return;
        }if(post.user == req.user.id){
            
            let userId = post.user;
            post.remove();
            User.findByIdAndUpdate(userId, { $pull:{posts:req.query.id}},function(err,user){
                user.save();
                req.flash('success','Successfully deleted the post');
                return res.redirect('/profile');
                 
            });
            // if(req.xhr){
            //     return res.status(200).json({
            //         data:req.query.id,
            //         message : "delete Comment!"
            //     })
            // }


        }else{
            console.log("post user != req.user.id");
            return res.redirect('back');
        }
    })





    // try {
    //     const id = req.query.id;
    
    //     let post = await Post.findById(id);
    //     console.log("delete post",post);
    //     console.log("REQ USER",req.user.id);
    //     if(post.user == req.user.id){

    //         let userId = post.user;
    //         post.remove();

    //         await User.findByIdAndUpdate(userId,{ $pull:{posts:id}})
    //         User.save();
    //         await Comment.deleteMany({post :id});

    //         req.flash('success',`post is successfully deleted` );
    //         return res.redirect('/profile');



    //     }else{
    //         req.flash('error',`the post can't be delete by you sign in again` );
    //         return res.redirect('back');
            
    //     }
    // } catch (error) {
    //     req.flash('error',`error in deleting post` );
    //     return res.redirect('back');
    // }
        
        
        
        
        
    
    
}


module.exports.deleteComment = function(req,res){
    Comment.findById(req.query.id,function(err,comment){
        if(err){
            
            console.log("errro in comment by id",err);
            return;
        }if(comment.user == req.user.id){
            
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull:{comments:req.query.id}},function(err,post){
                req.flash('success','Successfully deleted the comment');
                return res.redirect('back');
                 
            });
            if(req.xhr){
                return res.status(200).json({
                    data:req.query.id,
                    message : "delete Comment!"
                })
            }


        }else{
            
            return res.redirect('back');
        }
    })

}