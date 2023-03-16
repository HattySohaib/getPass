const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Creating models for mongodb
const logSchema = new mongoose.Schema({
  name: String,
  roll: String,
  reason: String,
  outDate: String,
  outTime: String,
  inTime: String,
  date: String,
});

const Log = mongoose.model("gateLog", logSchema);

const outSchema = new mongoose.Schema({
  name: String,
  roll: String,
  reason: String,
  outTime: String,
  outDate: String,
  OTP: String,
  status: Number, //status 0: Generated OTP but IN, 1: OUT of Campus, 2: Generated second OTP
});

const Outlog = mongoose.model("Outlog", outSchema);

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  profile: {
    type: String,
  },
  phone: {
    type: String,
  },
  hostel: {
    type: String,
  },
  room: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);

//
const staffSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  profile: {
    type: String,
  },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = { Log, User, Outlog, Staff };
