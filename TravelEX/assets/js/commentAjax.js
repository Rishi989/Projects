$(document).ready(function(){

        let userName = $('.PEprofile>h2').text();
        

        let createComment = function(){
            let newComment = $('#commentForm');
            newComment.submit(function(e){
                e.preventDefault();

                $.ajax({
                    type : 'post',
                    url : '/comment-create',
                    data : newComment.serialize(),
                    success : function(data){
                        let displayComment = commentDom(data.data.Comment);
                        $('#commentSection').prepend(displayComment);
                        
                    },error : function(error){
                        console.log(error.responseText)
                    }
                })

            })
        }


        let commentDom = function(comment){
            return $(`
            <div id="comments${comment._id}">
                        <div class="comElement">
                            <div class="commentDisplay">
                                <div class="CDimg"></div>
                                <div class="commentD">
                                    <div class="Cname">
                                        <h3>${userName}</h3>
                                    </div>
                                    <div class="Ccomment">
                                        <p>${comment.content}</p>
                                    </div>
            
                                </div>
                            </div>
                            
                            <div class = "commentDelete">
                            <a  href="#" >
                                <div class="comDelete"></div>
                            </a>
                            </div>
                            
                            
                        </div>
                    </div>
            
            `) 
        }

        // let deleteLink = $(".commentDelete");
        // let deleteComment = function(deleteLink){
        //     $(deleteLink).submit(function(e){
        //         e.preventDefault();
        //         // $.ajax({
        //         //     type : 'get',
        //         //     url : deleteLink.attr('href'),
        //         //     success : function(data){
        //         //         $(`#comment${data}`).remove();
        //         //     },error : function(error){
        //         //         console.log(error.responseText);
        //         //     }
        //         // })
        //     })
        // }

        // deleteComment(deleteLink);
        

        $(".commentDelete").click(function(){
            console.log("rishiskdsjkjald")
            
        })
    




        createComment();
});