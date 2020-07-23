var app = angular.module("CompanyProfile", []);

app.controller("IndexController", function ($scope, $http) {
  $http.get("/tentang/").then(function (response) {
    $scope.tentangs = response.data;
  });

  $http.get("/port/").then(function (response) {
    $scope.portofolios = response.data;
  });

  $http.get("/team/").then(function (response) {
    $scope.teams = response.data;
  });

  $http.get("/service/").then(function (response) {
    $scope.services = response.data;
  });

  $scope.GetRowIndex = function (index) {
    $window.alert("Row Index: " + index);
  };
});
