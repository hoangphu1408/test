const express = require("express");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(expressLayout);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(__dirname + "/public"));
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const data = [];
const PORT = process.env.PORT || 3000;
app.get("/test", (req, res) => {
  res.render("test", {
    data: data,
  });
});

app.post("/test", (req, res) => {
  res.send(req.body);
});

app.post("/images", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send(req.file);
});

app.listen(PORT, () => {
  console.log("Start");
});
