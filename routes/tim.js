/**
 * Team
 *
 */

var Team = require("../app/models/tim.js");
const { response } = require("express");

module.exports = function (app) {
  findAllTeams = function (req, res) {
    console.log("Method Get Team");
    return Team.find(function (err, team) {
      if (!err) {
        return res.json(team);
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  findById = function (req, res) {
    console.log("Method Get ID Teams");
    return Team.findById(req.params.id, function (err, team) {
      if (!team) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      if (!err) {
        return res.send({ status: "OK", team: team });
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  addTeams = function (req, res) {
    console.log("Method POST Teams");

    let file = req.files.gambar;
    let arrF = file.name.split(".");
    let format = arrF[arrF.length - 1];

    if (req.body.nim != null) {
      filename = req.body.nim + "." + format;
    }

    var team = new Team({
      gambar: filename,
      nama: req.body.nama,
      tugas: req.body.tugas,
      nim: req.body.nim,
    });

    team.save(function (err) {
      if (err) {
        if (err.code == 11000) {
          res.redirect("/tim?error=11000");
        } else {
          console.log("Error while saving team: " + err);
          res.send({ error: err });
        }
        return;
      } else {
        file.mv("./public/img/Uploads/" + filename, function (err) {
          if (err) {
            console.log(err);
            res.send("ERROR ACCURED");
          } else {
            console.log("Team Berhasil Dibuat");
            return res.redirect("/tim");
          }
        });
      }
    });
  };

  updateTeams = function (req, res) {
    console.log("Method PUT Teams");
    return Team.findById(req.params.id, function (err, team) {
      if (!team) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }

      let file = req.files.gambar;
      let arrF = file.name.split(".");
      let format = arrF[arrF.length - 1];

      if (req.body.nim != null) {
        team.nim = req.body.nim;
        filename = req.body.nim + "." + format;
      }
      if (req.body.nama != null) team.nama = req.body.nama;
      if (req.body.tugas != null) team.tugas = req.body.tugas;
      if (filename != null) team.gambar = filename;

      return team.save(function (err) {
        if (!err) {
          file.mv("./public/img/Uploads/" + filename, function (err) {
            if (err) {
              console.log(err);
              res.send("ERROR ACCURED");
            } else {
              console.log("Data Berhasil Diedit");
            }
          });
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
        return res.redirect("/tim");
      });
    });
  };

  deleteTeams = function (req, res) {
    console.log("Teams");
    return Team.findById(req.params.id, function (err, team) {
      if (!team) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      return team.remove(function (err) {
        if (!err) {
          console.log("Berhasil Hapus Team");
          return res.send({ status: "OK", team: team });
        } else {
          res.statusCode = 500;
          console.log("Internal error(%d): %s", res.statusCode, err.message);
          return res.send({ error: "Server error" });
        }
      });
    });
  };

  //Link routes and actions
  app.get("/team", findAllTeams);
  app.get("/team/:id", findById);
  app.post("/team", addTeams);
  app.post("/team/:id", updateTeams);
  app.delete("/team/:id", deleteTeams);
};
