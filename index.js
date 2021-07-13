const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")
const multer = require("multer")
const jwt = require("jsonwebtoken")
const cors = require("cors")
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb+srv://xun:cenxun@cluster0.vxbsw.mongodb.net/altech?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

  app.use("/api/auth", authRoute);
  app.use("/api/posts", postRoute)

  app.listen("5000", () => {
    console.log("Backend is running.");
  });