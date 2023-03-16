const express = require("express");
const router = express.Router();
const mongo = require("../mongo.js");

// Required function to manipulate data

async function removeOutLog(uid) {
  let user = await mongo.Outlog.findOne({ OTP: uid });
  mongo.Outlog.findOneAndDelete({ roll: user.roll }, function (err, done) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully logged!");
    }
  });
}

async function createGateLog(uid) {
  const d = new Date();
  let currentTime = d.toLocaleTimeString();
  let user = await mongo.Outlog.findOne({ OTP: uid });
  if (user.status == 0) {
    await mongo.Outlog.updateOne({ OTP: uid }, { status: 1 });
  } else if (user.status == 2) {
    await mongo.Log.create({
      name: user.name,
      roll: user.roll,
      reason: user.reason,
      outTime: user.outTime,
      inTime: currentTime,
      date: user.outDate,
    });
    removeOutLog(uid);
  } else {
    var msg = "Ask Student to generate new OTP!";
  }
}

async function createOutLog(uid, reason) {
  let user = await mongo.User.findOne({ roll: uid });
  let user2 = await mongo.Outlog.findOne({ roll: uid });
  if (user2) {
    console.log(user2.qrId);
  } else {
    const d = new Date();
    let currentTime = d.toLocaleTimeString();
    let currentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    let outOTP =
      Math.random().toString().substring(2, 5) + d.getMilliseconds().toString();
    mongo.Outlog.create({
      name: user.name,
      roll: uid,
      reason: reason,
      outTime: currentTime,
      outDate: currentDate,
      OTP: outOTP,
      status: 0,
    });
  }
}

router.post("/outNow", function (req, res) {
  createOutLog(req.body.uid, req.body.reason);
  res.redirect("/user/dashboard");
});

router.post("/inNow", async function (req, res) {
  let user = await mongo.Outlog.findOne({ roll: req.body.uid });
  if (user && user.status == 1) {
    const d = new Date();
    let inOTP =
      Math.random().toString().substring(2, 5) + d.getMilliseconds().toString();
    await mongo.Outlog.updateOne(
      { roll: req.body.uid },
      { OTP: inOTP, status: 2 }
    );
  }
  res.redirect("/user/dashboard");
});

router.post("/gatelog", async function (req, res) {
  let user = await mongo.Outlog.findOne({ OTP: req.body.enterOtp });
  if (user) {
    createGateLog(req.body.enterOtp);
    res.redirect("/user/dashboard");
  } else if (!user) {
    res.send("Sorry, OTP not found! Please check again.");
  }
});

module.exports = router;
