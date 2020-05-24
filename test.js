const express = require("express");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const app = express();

app.use(expressLayout);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(__dirname + "/public"));
const data = [];

app.get("/test", (req, res) => {
  res.render("test", {
    data: data,
  });
});

app.post("/test", (req, res) => {
  data.push(req.body);
  res.send(req.body);
  //return res.redirect("back");
});

app.listen(5000, () => {
  console.log("Start");
});
