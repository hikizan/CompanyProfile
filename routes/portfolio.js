/**
 * Team
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Aditya Salman
 */

var Portofolio = require("../app/models/portfolio.js");

module.exports = function (app) {
  findAllTeams = function (req, res) {
    console.log("Method Get Team");
    return Portofolio.find(function (err, portofolio) {
      if (!err) {
        return res.json(portofolio);
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  findById = function (req, res) {
    console.log("Method Get ID Portfolio");
    return Portofolio.findById(req.params.id, function (err, portofolio) {
      if (!portofolio) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      if (!err) {
        return res.send({ status: "OK", portofolio: portofolio });
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  addPortfolio = function (req, res) {
    console.log("Method POST Portfolio");

    let file = req.files.gambar;
    let filename = file.name;

    var portofolio = new Portofolio({
      gambar: filename,
    });

    portofolio.save(function (err) {
      if (err) {
        console.log("Error while saving team: " + err);
        res.send({ error: err });
        return;
      } else {
        file.mv("./public/img/port/" + filename, function (err) {
          if (err) {
            console.log(err);
            res.send("ERROR ACCURED");
          } else {
            console.log("Team Berhasil Dibuat");
            return res.redirect("/portfolio");
          }
        });
      }
    });
  };

  updatePortfolio = function (req, res) {
    console.log("Method PUT Portfolio");
    return Portofolio.findById(req.params.id, function (err, portofolio) {
      if (!portofolio) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      let file = req.files.gambar;
      let arrF = file.name.split(".");
      let format = arrF[arrF.length - 1];

      if (portofolio.gambar != null) {
        filename = portofolio.gambar + "." + format;
        portofolio.gambar = filename;
      }

      return portofolio.save(function (err) {
        if (!err) {
          file.mv("./public/img/port/" + filename, function (err) {
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
        return res.redirect("/portfolio");
      });
    });
  };

  deletePortfolio = function (req, res) {
    console.log("Portfolio");
    return Portofolio.findById(req.params.id, function (err, portofolio) {
      if (!portofolio) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      return portofolio.remove(function (err) {
        if (!err) {
          console.log("Berhasil Hapus Team");
          return res.send({ status: "OK", portofolio: portofolio });
        } else {
          res.statusCode = 500;
          console.log("Internal error(%d): %s", res.statusCode, err.message);
          return res.send({ error: "Server error" });
        }
      });
    });
  };

  //Link routes and actions
  app.get("/port", findAllTeams);
  app.get("/portofolio/:id", findById);
  app.post("/portofolio", addPortfolio);
  app.post("/portofolio/:id", updatePortfolio);
  app.delete("/portofolio/:id", deletePortfolio);
};
