var app = angular.module("CompanyProfile", []);

app.controller("Serviscontroller", function ($scope, $http, $timeout) {
  $http.get("/service/").then(function (response) {
    $scope.services = response.data;
  });
  $scope.GetRowIndex = function (index) {
    $window.alert("Row Index: " + index);
  };
  var arrURL = window.location.href.split("/");
  let ID = arrURL[arrURL.length - 1];
  var page = arrURL[arrURL.length - 2];

  if (ID != undefined && page == "edit_servis") {
    $http.get("/service/" + ID).then(function (response) {
      $scope.editData = response.data.service;
      console.log($scope.editData._id);
    });
    $scope.iconserv = [
      { icon: "android" },
      { icon: "web" },
      { icon: "desktop_windows" },
    ];
    $.each($scope.iconserv, function (i, data) {
      var $newOpt = $("<option>").attr("value", data.icon).text(data.icon);
      $("#SelectIcon").append($newOpt);
    });
  }

  $scope.delserv = function (id) {
    $http.delete("/service/" + id).then(function (data) {
      location.reload();
    });
  };
});
