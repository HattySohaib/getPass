const express = require("express");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const logRoutes = require("./routes/log.js");
const homeRoutes = require("./routes/home.js");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

require("./auth.js");

//

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/getPass");

app.use(bodyParser.urlencoded({ extended: false }));

// Sessions middleware
app.use(
  session({
    secret: "IIITDMK ROCKS!",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/log", logRoutes);
app.use("/", homeRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/success", (req, res) => {
  res.render("successpage", {
    color: "red",
    text: "You are late.",
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
