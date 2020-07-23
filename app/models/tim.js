/**
 * team
 *
 * @module      :: Model
 * @description :: Represent data model for the teams
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Team = new Schema({
  gambar: {
    type: String,
    require: true,
  },
  nama: {
    type: String,
    require: true,
  },
  nim: {
    type: String,
    require: true,
    unique: true,
  },
  tugas: {
    type: String,
    require: false,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Team", Team);
