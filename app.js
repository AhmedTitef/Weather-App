const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "db18655fcbd7b07ec13f1fe6aa8e9474";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData =   JSON.parse(data);


    const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;


    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";





    // or use
     res.write("<h1>The temperature in "+weatherData.name+" is " + Math.floor(temp) + " degrees fahrenheits.</h1>");
    res.write("<p>The weather is currently " + weatherDescription + " </p>");
    res.write("<img src=" + imageURL + ">");
    res.send();
    });
  });
});




app.listen(3000, function(){
  console.log("server is running");
});
