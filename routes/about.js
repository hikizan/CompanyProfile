/**
 * Team
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Aditya Salman
 */

var Tentang = require("../app/models/about.js");

module.exports = function (app) {
  findAllTeams = function (req, res) {
    console.log("Method Get Team");
    return Tentang.find(function (err, tentang) {
      if (!err) {
        return res.json(tentang);
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  findById = function (req, res) {
    console.log("Method Get ID Contact");
    return Tentang.findById(req.params.id, function (err, tentang) {
      if (!tentang) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      if (!err) {
        return res.send({ status: "OK", tentang: tentang });
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  addContact = function (req, res) {
    console.log("Method POST Contact");

    var tentang = new Tentang({
      judul: req.body.judul,
      desk: req.body.desk,
    });

    tentang.save(function (err) {
      if (err) {
        console.log("Error while saving team: " + err);
        res.send({ error: err });
        return;
      } else {
        console.log("Team Berhasil Dibuat");
        return res.redirect("/about");
      }
    });
  };

  updateAbout = function (req, res) {
    console.log("Method PUT About");
    return Tentang.findById(req.params.id, function (err, tentang) {
      if (!tentang) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }

      if (req.body.judul != null) tentang.judul = req.body.judul;
      if (req.body.desk != null) tentang.desk = req.body.desk;

      return tentang.save(function (err) {
        if (!err) {
          console.log("Updated");
          return res.redirect("/about");
        } else {
          if (err.name == "ValidationError") {
            res.statusCode = 400;
            res.send({ error: "Validation error" });
          } else {
            res.statusCode = 500;
            res.send({ error: "Server error" });
          }
          console.log("Internal error(%d): %s", res.statusCode, err.message);
        }
        res.send(tentang);
      });
    });
  };

  deleteContact = function (req, res) {
    console.log("Contact");
    return Tentang.findById(req.params.id, function (err, tentang) {
      if (!tentang) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      return tentang.remove(function (err) {
        if (!err) {
          console.log("Berhasil Hapus Team");
          return res.send({ status: "OK", tentang: tentang });
        } else {
          res.statusCode = 500;
          console.log("Internal error(%d): %s", res.statusCode, err.message);
          return res.send({ error: "Server error" });
        }
      });
    });
  };

  //Link routes and actions
  app.get("/tentang", findAllTeams);
  app.get("/tentang/:id", findById);
  app.post("/tentang", addContact);
  app.post("/tentang/:id", updateAbout);
  app.delete("/tentang/:id", deleteContact);
};
