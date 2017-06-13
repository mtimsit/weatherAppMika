//Ne pas oublier de faire l'installation du module express: npm install express --save
var express = require('express');
var app = express();

//Ne pas oublier de faire l'installation du module ejs: npm install ejs --save
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Ne pas oublier de faire l'installation du module express: npm install request --save
var request = require('request');

var cityList = [
  /*{city: "Lyon",
  image: getImage("nuageux"),
  desc:"nuageux",
  tempMin:"17 °C",
  tempMax:"26 °C"},

  {city: "Paris",
  image: getImage("ciel dégagé"),
  desc:"ciel dégagé",
  tempMin:"13.2 °C",
  tempMax:"24.3 °C"},

  {city: "Marseille",
  image: getImage("ciel dégagé"),
  desc:"ciel dégagé",
  tempMin:"14 °C",
  tempMax:"22.4 °C"},*/

];

function getImage(weatherDesc)
{
  var imageURL = "";
  switch(weatherDesc.toLowerCase())
    {
      case "nuageux":
        imageURL = "http://openweathermap.org/img/w/03d.png";
        break;

      case "ciel dégagé":
        imageURL = "http://openweathermap.org/img/w/01d.png";
        break;
      
      case "partiellement ensoleillé":
        imageURL = "http://openweathermap.org/img/w/02d.png";
        break;

      case "couvert":
        imageURL = "http://openweathermap.org/img/w/02d.png";
        break;
    }

  return imageURL;
};

function addCity(body) {
  var jsonBody = JSON.parse(body);
        
        var newCity = {
          city: jsonBody.name,
          image: getImage(jsonBody.weather[0].description),
          desc: jsonBody.weather[0].description,
          tempMin: jsonBody.main.temp_min + "° C",
          tempMax: jsonBody.main.temp_max + "° C"
        };
        
        cityList[cityList.length] = newCity;
}

function deleteCity(id)
{
  console.log("call splice")
  cityList.splice(id,1);
}

app.get("/", function (req, res) {

    var callbackAdd = "";

    switch(req.query.action.toUpperCase())
    {
      case "READ":
      res.render('index', {cityList: cityList}); //action: action, clientId : clientId});
        break;

      case "ADD":
      request("http://api.openweathermap.org/data/2.5/weather?q="+req.query.city+"&units=metric&lang=fr&appid=75a5967a4efca92984636371d0b024ca", function(error, response, body) {
        addCity(body);     
        console.log(body);
        res.render('index', {cityList: cityList});
      });
        break;
      
      case "DELETE":
      deleteCity(req.query.id);
      res.render('index', {cityList: cityList});
        break;
    }

    
    
    
});

/*app.post("/", function (req, res) {
  switch(req.body.action.toUpperCase())
  {
    case "CANCEL":
      clientId = "";
      action = "CANCEL";
      break;

    case "EDIT":
      clientId = req.body.id;
      action = "EDIT";
      break;

    case "UPDATE":
      clientId = req.body.id;
      action = "UPDATE";
      updateClient(req.body.id,req.body.firstName,req.body.lastName,req.body.email,req.body.phone,req.body.image);
      break;
    
    case "DELETE":
      clientId = "";
      action = "DELETE";
      deleteClient(req.body.id);
      break;
    
    case "ADD":
      clientId = "";
      action = "ADD";
      addClient(req.body.addId,req.body.addFirstName,req.body.addLastName,req.body.addEmail,req.body.addPhone,req.body.addImage);
      break;
  }
  res.render('index', {clientList: clientList, action: action, clientId: clientId});
});*/

app.listen(8080, function () {
  console.log("Server listening on port 8080");

  request("http://api.openweathermap.org/data/2.5/weather?q=Lyon&units=metric&lang=fr&appid=75a5967a4efca92984636371d0b024ca", function(error, response, body) {addCity(body);});
  request("http://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&lang=fr&appid=75a5967a4efca92984636371d0b024ca", function(error, response, body) {addCity(body);});
  request("http://api.openweathermap.org/data/2.5/weather?q=Marseilles&units=metric&lang=fr&appid=75a5967a4efca92984636371d0b024ca", function(error, response, body) {addCity(body);});
});
