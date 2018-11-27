var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
const multer = require("multer");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const upload = multer({
  dest: "tmp/",
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image/png")) {
      cb(new Error("Le format du fichier n'est pas accepté"));
    }
    cb(null, true);
  }
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/monupload", (req, res) => {
  res.render("form", { title: "Upload" });
});

router.post("/monupload", upload.array("monfichier"), (req, res, next) => {
  console.log(req.files);
  res.end();
});

module.exports = router;
