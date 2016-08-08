var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

var models = require("./models");
models.sequelize.sync();

//config
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));


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

app.put("/updateBurgerStatus/:id", function(req, res){
	console.log("newValue",req.body.devoured)
	models.Burgers.update(
		{
			devoured: Boolean(req.body.devoured)
		},
		{
			where: {
				id: req.params.id
			}
		}
	).then(function(){
		res.redirect("/")
	})
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