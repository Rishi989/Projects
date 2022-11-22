const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const User = require('./model/user');
const List = require('./model/expense');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratagy');
const MongoStore = require('connect-mongo');
const { realpathSync } = require('fs');

const Post = require('./model/post');


///////////////////////

const port= 4000;
const app = express();

////MIDDLE Ware///////////////
app.use(express.urlencoded());
app.use(express.static('assets'));
///// setting ejs/////
app.set('view engine','ejs');
app.set('views',path.join('views'));
/////////////MiddleWare-Seesion///////
app.use(session({
    name : 'Expense-Trackor',
    secret : 'rishirajrathore',
    saveUninitialized:false,
    resave:false,
    age:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl:'mongodb://localhost/Expense',
        autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'OK');
        }
    )
}))
//////////Passport-MW////////////
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// console.log(user);

///////////////Date//////////////////
let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let date = new Date();
let stdate = `${date.getDate()}:${month[date.getMonth()]}:${date.getFullYear()}`;
////// to find which Type //////
function getType(obj){
    if(obj.Expense === 'on'){
        return 'Expense';
    }else if(obj.Investment === 'on'){
        return 'Investment';
    }else{
        return 'Saving';
    }
}
/////////////////////////////////////////////////////////


app.get('/',function(req,res){
    console.log("home user",res.locals.user._id);
    Post.find({user : res.locals.user._id},function(err,post){
        if(err){
            console.log("error in finding post",err);
            return;
        }res.render('home',{
            postCont : post
        })
    })

    
})


///////////////Sing-In and Sign-Up////////
app.get('/sign-in',function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/expense-trackor');
    }
    return res.render('sign-in');
})

app.get('/sign-up',function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/expense-trackor');
    }
    return res.render('sign-up');
})

app.get('/sign-out', function(req, res){
    req.logout(function(err) {
        if (err) { console.log(err);return }
        res.redirect('/sign-in');
      });
});

app.post('/create',function(req,res){
    User.create(req.body, function(err,user){
        if(err){
            console.log("error in creating user in db after signup",err);
            return;
        }console.log(user);
        return res.redirect('/sign-in');
    })
})

app.post('/login',passport.authenticate('local',{failureRedirect:'/sign-in'}),function(req,res){
        
        return res.redirect('/');
    }
)





app.post('/post',passport.checkAuthentication,function(req,res){
    Post.create({
        content:req.body.content,
        user: res.locals.user._id

    }, function(err,post){
        if(err){
            console.log('error in post',err);
            return;
        }//console.log(post);
        return res.redirect('/');
    })
})














/////////////////Expense trackor part ////////////////////////////////

app.get('/expense-trackor',passport.checkAuthentication,function(req,res){
    //// to Calulate the saving total and other's total for the chart
    // console.log("expense-user",req.user);
    // console.log("expense res.user",res.locals.user);

    let Save =0;
    let Invest =0;
    let Expense = 0;
    List.find({type:'Saving'},function(err,list){
        if(err){console.log('error in finding Expense',err);return}
        for(let i of list){
            Save += i.amount;
        }console.log(Save);

    })
    List.find({type:'Investment'},function(err,list){
        if(err){console.log('error in finding invest',err);return}
        for(let i of list){
            Invest += i.amount;
        }console.log(Invest);

    })
    List.find({type:'Expense'},function(err,list){
        if(err){console.log('error in finding Save',err);return}
        for(let i of list){
            Expense += i.amount;
        }console.log(Expense);

    })

    ///// to display the notes///////
    List.find({},function(err,list){
        if(err){
            console.log("error in calling object",err);
            return;
        }
        res.render('expense',{
            array : list,
            save : Save,
            invest:Invest,
            expense:Expense
        });
    })
    
})
app.get('/delete',function(req,res){
    const id = req.query.id;
    List.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting the list",err);
            return;
        }return res.redirect('back');
    })
})

app.post('/expense-form',function(req,res){
    List.create({
        discription:req.body.discription,
        amount:req.body.amount,
        date: stdate,
        type: getType(req.body),
    },function(err,et){
        if(err){
            console.log('error in creating db object',err);
            return;
        }console.log(et);
    });
    return res.redirect('back');
})





///////////////////////////////////////////////////
app.listen(port,function(err){
    if(err){
        console.log("error in setting server",err);
        return ;
    }console.log("sever is suuccesfully connected",port);
})