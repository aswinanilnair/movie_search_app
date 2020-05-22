const express = require('express');
const app = express();
const request = require('request');
app.set("view engine","ejs")
app.use(express.static(__dirname + "/public"));


app.get('/',function(req,res){
    res.render("search");
})

app.get('/results',function(req,res){
    var query = req.query.search;
    var url = 'https://omdbapi.com/?s='+query+'&apikey=thewdb';
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.render("results",{data: data});
        } else {
          console.log(error);
        }
    });
})

app.listen(3000,function(){
    console.log("App has started at localhost:3000")
});
