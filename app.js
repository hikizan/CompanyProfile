/*
 * Main App file App.js
 * @author Aditya Salman
 */

// Dependencies requirements, Express 4
var express = require("express");
var app = express();
var path = require("path");

var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var upload = require("express-fileupload");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/app", express.static(__dirname + "/app"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(upload());

app.use("/assets", [
  express.static(__dirname + "/node_modules/materialize-css/dist"),
  express.static(__dirname + "/node_modules/angular"),
  express.static(__dirname + "/node_modules/jquery/dist"),
]);

routes = require("./routes/tim")(app);
routes = require("./routes/servis")(app);
routes = require("./routes/about")(app);
routes = require("./routes/portfolio")(app);

// MongoDB configuration
mongoose.connect("mongodb://localhost/companyprofile", function (err, res) {
  if (err) {
    console.log("error connecting to MongoDB Database. " + err);
  } else {
    console.log("Connected to Database");
  }
});

app.listen(8080);
console.log("Im listening on port 8080");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});
app.post("/admin", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == "admin" && password == "123") {
    res.redirect("/admin/");
  } else {
    res.redirect("back");
  }
});
app.get("/admin", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/admin.html"));
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/login.html"));
});
app.get("/servis", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/servis.html"));
});
app.get("/portfolio", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/portfolio.html"));
});
app.get("/edit_servis/:id", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/edit_servis.html"));
});
app.get("/tim", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/tim.html"));
});
app.get("/edit_tim/:id", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/edit_tim.html"));
});
app.get("/edit_port/:id", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/edit_port.html"));
});
app.get("/edit_about/:id", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/edit_about.html"));
});
