// jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();



const homeStartingContent = "WellCome to your blogging site. Here you can write any thing you want may be your experience, about your day, your goods or bads, anything you like.";
const aboutContent = "Hi Myself Ayush.";
const contactContent = "Mail : ayushs1625@gmail.com";

const arraypost=[];

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/about",function(req,res){
    res.render(__dirname+"/views/about.ejs",{aboutCont : aboutContent});
})

app.get("/contact",function(req,res){
    res.render(__dirname + "/views/contact.ejs",{contCont:contactContent});
})

app.post("/compose",function(req,res){
    const postOBJ = {
        title : req.body.postTitle,
        body : req.body.postBody,
    };
    arraypost.push(postOBJ);
    res.redirect("/");
})

app.get("/compose",function(req,res){
    res.render(__dirname+"/views/compose.ejs");
})


app.get("/post/:lnkval",function(req,res){
    const flag =_.lowerCase(req.params.lnkval);
    arraypost.forEach(function(pos){
        if(_.lowerCase(pos.title)===flag){
            res.render(__dirname+"/views/post.ejs",{cont:pos});
        }
    })
})



app.get("/",function(req,res){
    res.render(__dirname+"/views/home.ejs",{cont1: homeStartingContent,content:arraypost});
})

app.listen(process.env.port || 3000 , function(){
    console.log("server is running on port 3000");
})