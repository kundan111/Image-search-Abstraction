
//requiring all the modules
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var bing = require("node-bing-api")({accKey: "f2d63d8d6fd249d5ae7ab02b9092daec"});


// instanting the express
var app = express();

//using app
app.use(bodyParser.json());
app.use(cors());

//making a get call
app.get("/api/imagesearch/:searchval*",function(req,res,next){

    var searchval = req.params.searchval;
    var offset = req.query.offset;

  return res.json(
  {  searchval,
    offset
  })


});








//listen to the a port
app.listen(process.env.PORT || 3000,function(err){

      if(err)
        throw err;
      else
        console.log("Connected to port 3000!");


})
