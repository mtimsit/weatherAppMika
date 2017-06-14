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


function addCity(body) {
  var jsonBody = JSON.parse(body);
        
        var newCity = {
          id:jsonBody.id,
          city: jsonBody.name,
          image: "http://openweathermap.org/img/w/"+jsonBody.weather[0].icon+".png",
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

function sortCityList(idList)
{
  var idTab = idList;

  var tempCityList = [];
  for(var i=0;i<cityList.length;i++)
  {
    tempCityList[i] = cityList[i];
  }

  for(var i=0; i<idTab.length; i++)
  {
    for(var j=0;j<tempCityList.length;j++)
    {
      if(tempCityList[j].id == idTab[i])
      {
        cityList[i] = tempCityList[j];
      }
    }
    //cityList[i] = tempCityList[parseInt(idTab[i])];
  }
}

app.get("/", function (req, res) {

  res.render('index', {cityList: cityList}); //action: action, clientId : clientId});
});

app.get("/read", function (req, res) {

  res.render('index', {cityList: cityList}); //action: action, clientId : clientId});
});

app.get("/add", function (req, res) {

  request("http://api.openweathermap.org/data/2.5/weather?q="+req.query.city+"&units=metric&lang=fr&appid=75a5967a4efca92984636371d0b024ca", function(error, response, body) {
        addCity(body); 
        //console.log(body);
        res.render('index', {cityList: cityList});
      });
});

app.get("/delete", function (req, res) {

  deleteCity(req.query.id);
  res.render('index', {cityList: cityList});
});

app.get("/sort", function (req, res) {

      console.log(req.query.data);
      sortCityList(req.query.data);
      res.render('index', {cityList: cityList});
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
