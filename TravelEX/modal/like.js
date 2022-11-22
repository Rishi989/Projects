const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    likeable:{                              /// ID OF POST AND COMMENT EITHER IS STORED IN LIKEABLE
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'onModal',
        required:true,
    },
    onModal :{                              //// TYPE EITHER POST/COMMENT IS STORED IN ONMODAL
        type :String,
        required : true,
        enum : ['Post','Comment']
    }
},{
    timestamps:true,
})

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;