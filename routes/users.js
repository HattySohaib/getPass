const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongo = require("../mongo.js");

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/user/dashboard");
  } else {
    res.render("login");
  }
});

router.post("/fill", async (req, res) => {
  await mongo.User.updateOne(
    { roll: req.body.roll },
    {
      phone: req.body.phone,
      room: req.body.room,
      hostel: req.body.hostel,
    }
  );
  res.redirect("/user/dashboard");
});

router.post("/edit", async (req, res) => {
  await mongo.User.updateOne(
    { roll: req.body.uid },
    {
      name: req.body.name,
      phone: req.body.phone,
      room: req.body.room,
      hostel: req.body.hostel,
    }
  );
  console.log(req.body.roll);
  res.redirect("/user/dashboard");
});

router.get("/dashboard", async (req, res) => {
  if (req.isAuthenticated()) {
    let staff = await mongo.Staff.findOne({ googleId: req.user.googleId });
    if (staff) {
      if (staff.profile == "Staff") {
        const d = new Date();
        let currentDate =
          d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
        let returned = await mongo.Log.countDocuments({ date: currentDate });
        let out = await mongo.Outlog.countDocuments({ status: { $ne: 0 } });
        res.render("dashboardguard", {
          image: req.user.image,
          outCount: out,
          retCount: returned,
          Total: out + returned,
        });
      } else if (staff.profile == "Warden") {
        res.render("dashboardguard");
      }
    } else {
      let user = await mongo.User.findOne({ googleId: req.user.googleId });
      if (
        user.hostel === "XXXX" ||
        user.room === "000" ||
        user.phone === "0000000000"
      ) {
        res.render("profile", { roll: user.roll });
      } else {
        let user1 = await mongo.Outlog.findOne({ roll: req.user.roll });
        if (user1) {
          res.render("dashboard", {
            name: req.user.name,
            roll: req.user.roll,
            image: req.user.image,
            hostel: req.user.hostel,
            outOTP: user1.OTP,
            status: user1.status,
          });
        } else {
          res.render("dashboard", {
            name: req.user.name,
            roll: req.user.roll,
            image: req.user.image,
            hostel: req.user.hostel,
            outOTP: "000XXX",
            status: -1,
          });
        }
      }
    }
  } else {
    res.redirect("/user/login");
  }
  // res.render("dashboardguard", {
  //   image: "none",
  //   outCount: "4",
  //   retCount: "5",
  //   Total: "9",
  // });
});

router.post("/success", async (req, res) => {
  let user = await mongo.Outlog.findOne({ roll: req.body.uid });
  if (user) {
    res.send("OTP not submitted!");
  } else {
    res.render("successpage", {
      color: "green",
      text: "You have entered the campus.",
    });
  }
});
router.post("/profile", async function (req, res) {
  let user = await mongo.User.findOne({ roll: req.body.uid });
  res.render("editpro", {
    roll: req.body.uid,
    name: user.name,
    phone: user.phone,
    room: user.room,
  });
});

module.exports = router;
