var app = angular.module("CompanyProfile", []);

app.controller("Portfoliocontroller", function ($scope, $http) {
  $http.get("/port/").then(function (response) {
    $scope.portofolios = response.data;
  });
  $scope.GetRowIndex = function (index) {
    $window.alert("Row Index: " + index);
  };
  var arrURL = window.location.href.split("/");
  let ID = arrURL[arrURL.length - 1];
  var page = arrURL[arrURL.length - 2];

  if (ID != undefined && page == "edit_port") {
    $http.get("/portofolio/" + ID).then(function (response) {
      $scope.editData = response.data.portofolio;
    });
  }
  $scope.delport = function (id) {
    $http.delete("/portofolio/" + id).then(function (data) {
      location.reload();
    });
  };
});
