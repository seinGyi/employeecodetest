const express = require('express');
const ejs = require('ejs');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees');
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to mongodb');
})

db.on('error', function(err){
  console.log(err);
})

const app = express();

//models
let Employee = require('./models/employee');
let Record = require('./models/record');

//setup ejs
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

//home route
app.get("/", function(req, res){
  Record.find({}, function(err, rcd){
    Employee.findOne({ eID:3 }, function (err, rtn) {
       if(err) throw err;
       res.render('index', {
         title: 'Employees',
         p: 'Your available credits',
         eData:  rtn,
         record: rcd
       });
    });
  });
});

//credit route
app.get('/credits', function(req, res){
  Employee.findOne({ eID:3 }, function (err, rtn) {
    if(err) throw err;
    res.render("credits", {
      title: 'Credits',
      p: "Your available credits is",
      aCredit: rtn.aCredit
    });
  });
});

//submit route
app.post('/submit', function(req, res){
  let query = {eID:3};
  Employee.findOne(query, function (err, rtn) {
    if(err) throw err;
    console.log("you submitted.");
    let a = rtn.aCredit;
    let b = req.body.amount;
    let c = a-b;
    var update = {
      aCredit: c
    };

      var record = new Record();
      record.name = rtn.name;
      record.cAmount = b;
      record.date = Date.now();
      record.rAmount = c;

      record.save(function (err) {
        if (err)  throw err;
      });

    Employee.update(query, update, function (err){
      if(err){
        console.log(err);
        return;
      }else {
        res.redirect('/');
      }
      console.log("available credits is"+ c);
    });
  });
});

app.listen("3000", function(){
  console.log("Server is running on port: '3002'");
});
