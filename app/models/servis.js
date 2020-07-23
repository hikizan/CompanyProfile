/**
 * team
 *
 * @module      :: Model
 * @description :: Represent data model for the teams
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Service = new Schema({
  logo: {
    type: String,
    require: true,
  },
  devisi: {
    type: String,
    require: true,
  },
  desk: {
    type: String,
    require: true,
  },

  modified: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", Service);
