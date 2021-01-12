var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
var router = express.Router();

const connectionURL = `mongodb+srv://uttam:Uttam9313@cluster0.xxvor.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.log(err);
    console.log("connection successful");
  }
);

router.get("/", (req, res) => {
  if (req.session.loggedin) {
    return res.redirect("/dashboard");
  }
  if (req.session.error) {
    let error = req.session.error;
    req.session.error = "";
    return res.render("index", { error });
  }
  res.render("index");
});

router.get("/dashboard", (req, res) => {
  if (req.session.loggedin) {
    return res.render("dashboard", { email: req.session.loggedin });
  }
  return res.redirect("/");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.sessions.error = "All fields are required";
    return res.redirect("/");
  }
  const queryResult = await User.findOne({ email: email }).exec();
  if (queryResult !== null) {
    req.session.error = "User with email already exists";
    return res.redirect("/");
  }
  const userObject = new User({ name, email, password });
  await userObject.save();
  req.session.loggedin = email;
  res.redirect("/dashboard");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.sessions.error = "All fields are required";
    return res.redirect("/");
  }
  const queryResult = await User.findOne({ email });
  if (queryResult != null) {
    if (password === queryResult.password) {
      req.session.loggedin = email;
      return res.redirect("/dashboard");
    }
    req.session.error = "Incorrect password";
  } else {
    req.session.error = "No such user exist";
  }
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
