const mongoose = require('mongoose');

const expnessSchema = new mongoose.Schema({
    username:{
        type:'string',

    },
    date : {
        type:'string',
        required:true
    },
    discription:{
        type:'string',
        required:true
    },
    amount:{
        type:'number',
        required:true
    },
    type:{
        type:'string',
        required:true
    }

})

const List = mongoose.model('ExpenseList',expnessSchema);

module.exports = List;