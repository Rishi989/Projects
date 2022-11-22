{
    let currentUser = $('#currentUser').text();
    



    let createForm = function(){
        let newPost = $('#post-form');
        
        newPost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/create-post',
                data: newPost.serialize(),
                
                success : function(data){
                    let postDom = showPost(data.data.Post);
                    

                    $('#postDisplay').prepend(postDom);
                    
                    $('#input').val(""); 
                },error: function(error){
                    cosnole.log(error.responseText);
                }

            })

        



        })
    }
        let showPost = function(post){
            return $(`
                    <div class="postElement">
                    <div class="PEprofile">
                    <div class="postImage"></div>
                    <div>
                        <h2> ${currentUser} </h2> 
                    </div>
                </div>

                        <div class="PEcontent">
                             <p style="font-size:1.3rem;"> ${post.content} </p>
                        </div>
                        

                        <div class="PEbtn">
                        <div>
                            <a href="/like"><img src="../img/like.png"></a>
                        </div>
                        <div>
                            <a href="/comment?id=${post._id }"><img src="../img/comment.png"></a>
                        </div>
                        <div>
                            <a href="/share"><img src="../img/share.png"></a>
                        </div>
                    </div>
                    </div>`)
        }


    createForm();
}



/*



*/