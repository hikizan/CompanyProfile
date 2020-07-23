/**
 * team
 *
 * @module      :: Model
 * @description :: Represent data model for the teams
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Portofolio = new Schema({
  gambar: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Portofolio", Portofolio);
