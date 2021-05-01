//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


let items = [];
let workItems = [];

app.get("/", function(req, res) {
  let today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  let day = today.toLocaleDateString('en-US', options);
  res.render("list", {
    listTitle: day,
    addItems: items
  });
});

app.post("/", function(req, res) {
  var item = req.body.addList;
  if (req.body.addButton === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    addItems: workItems
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
