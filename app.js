
//requiring all the modules
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var bing = require("node-bing-api")({accKey: "f2d63d8d6fd249d5ae7ab02b9092daec"});
var searchTerm = require("./models/searchTerm");
// mongoose.Promise = global.Promise;



// instanting the express
var app = express();

//using app
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/searchTerms");

//get all search terms from database

app.get("/api/recentsearches",function(req,res,next){

        searchTerm.find({},function(err,data){

        res.json(data);

    });

});

//making a get call
app.get("/api/imagesearch/:searchVal*",function(req,res,next){

    var searchVal = req.params.searchVal;
    var offset = req.query.offset;


var data = new searchTerm({

  searchVal,
  searchDate : new Date()

});

data.save(function(err){
    if(err){
        return res.send("Oooops!..Error");
    }


});

var searchOffset;

//does offset exist
if(offset){
  if(offset==1){
    offset=0;
    searchOffset=1;
  }
  else if (offset>1) {
    searchOffset =offset+1;
  }

}

bing.images(searchVal,{

  top: 10*searchOffset,
  skip: (10*offset)

},function(error,rez,body){


  // res.json(body);


    var bingData = [];

    for(var i =0 ;i <10 ;i++){

        bingData.push({

            url: body.value[i].webSearchUrl,
            snippet: body.value[i].name,
            thumbnail: body.value[i].thumbnailUrl,
            context: body.value[i].hostPageDisplayUrl

        });

}
res.json(bingData);

});

});





//listen to the a port
app.listen(process.env.PORT || 3000,function(err){

      if(err)
        throw err;
      else
        console.log("Connected to port 3000!");


})
