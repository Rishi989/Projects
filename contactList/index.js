
const express = require("express");
const path = require("path");
const port = 8000;
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const ObjectId = require('mongodb').ObjectId;
const Contacts = require('./model/contact');


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// const use = require(express.use.en)
app.use(express.urlencoded());



let contactList = [
    {name : "rishi",
     phone : "123456098"},
    {name : "raj",
     phone : "123441222"}
]


app.get('/',function(req,res){
    Contacts.find({},function(err,contacts){
        if(err){
            console.log(err);
            return;
        }res.render('home',{
            title: "Rishi Raj",
            contact_list : contacts,
        });
    })
    
})
app.post('/practice',function(req,res){
    Contacts.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContacts){
        if(err){
            console.log(err);
            return;
        }console.log(newContacts,typeof(newContacts));
        return res.redirect('back');
    })
})

app.get('/delete-contact',function(req,res){
    let id = req.query.id;
    console.log(id);
    
    // const query = {_id: ObjectId(id)};
    
    if(mongoose.Types.ObjectId.isValid(id)){
        console.log("id is objectID");
    }else{
        console.log("id is not objectID");
    }
    
    Contacts.findByIdAndDelete(id,function(err){
        if(err){
            console.log("deleting error has come",err);
            return;
        }res.redirect('back');
    })
})


app.listen(port,function(err){
    if(err){
        console.log("error : ",err);
        return;
    }
    console.log("OK");
})