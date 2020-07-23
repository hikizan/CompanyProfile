/**
 * Team
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Aditya Salman
 */

var Service = require("../app/models/servis.js");

module.exports = function (app) {
  findAllTeams = function (req, res) {
    console.log("Method Get Team");
    return Service.find(function (err, service) {
      if (!err) {
        return res.json(service);
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  findById = function (req, res) {
    console.log("Method Get ID Service");
    return Service.findById(req.params.id, function (err, service) {
      if (!service) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      if (!err) {
        return res.send({ status: "OK", service: service });
      } else {
        res.statusCode = 500;
        console.log("Internal error(%d): %s", res.statusCode, err.message);
        return res.send({ error: "Server error" });
      }
    });
  };

  addService = function (req, res) {
    console.log("Method POST Service");

    var service = new Service({
      logo: req.body.logo,
      devisi: req.body.devisi,
      desk: req.body.desk,
    });

    service.save(function (err) {
      if (err) {
        console.log("Error while saving team: " + err);
        res.send({ error: err });
        return;
      } else {
        console.log("Team Berhasil Dibuat");
        return res.redirect("/servis");
      }
    });
  };

  updateService = function (req, res) {
    console.log("Method PUT Service");
    return Service.findById(req.params.id, function (err, service) {
      if (!service) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }

      if (req.body.logo != null) service.logo = req.body.logo;
      if (req.body.devisi != null) service.devisi = req.body.devisi;
      if (req.body.desk != null) service.desk = req.body.desk;

      return service.save(function (err) {
        if (!err) {
          console.log("Updated");
          return res.redirect("/servis");
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
      });
    });
  };

  deleteService = function (req, res) {
    console.log("Service");
    return Service.findById(req.params.id, function (err, service) {
      if (!service) {
        res.statusCode = 404;
        return res.send({ error: "Not found" });
      }
      return service.remove(function (err) {
        if (!err) {
          console.log("Berhasil Hapus Team");
          return res.send({ status: "OK", service: service });
        } else {
          res.statusCode = 500;
          console.log("Internal error(%d): %s", res.statusCode, err.message);
          return res.send({ error: "Server error" });
        }
      });
    });
  };

  //Link routes and actions
  app.get("/service", findAllTeams);
  app.get("/service/:id", findById);
  app.post("/service", addService);
  app.post("/service/:id", updateService);
  app.delete("/service/:id", deleteService);
};
