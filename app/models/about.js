/**
 * team
 *
 * @module      :: Model
 * @description :: Represent data model for the teams
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tentang = new Schema({

    judul: {
        type: String,
        require: true
    },
    desk: {
        type: String,
        require: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tentang', Tentang);