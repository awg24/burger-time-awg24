var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;

var models = require("./models");
models.sequelize.sync();

//config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//routes
app.get("/", function(req, res){
	models.Burgers.findAll().then(function(data){
		res.render("welcome", {burgers: data});
	});
});

app.post("/addBurger", function(req, res){
	models.Burgers.create({
		burger_name: req.body.burger_name,
		devoured: req.body.devoured,
		date: new Date()
	}).then(function(){
		res.redirect("/");
	});
});


//listen on port
app.listen(PORT, function(){
	console.log("Doin' fine on port: " + PORT);
});