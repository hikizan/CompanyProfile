var app = angular.module("CompanyProfile", []);

app.controller("AboutController", function ($scope, $http) {
  $http.get("/tentang/").then(function (response) {
    $scope.tentangs = response.data;
  });

  $scope.delab = function (id) {
    $http.delete("/tentang/" + id).then(function (data) {
      location.reload();
    });
  };

  var arrURL = window.location.href.split("/");
  let ID = arrURL[arrURL.length - 1];
  var page = arrURL[arrURL.length - 2];

  if (ID != undefined && page == "edit_about") {
    $http.get("/tentang/" + ID).then(function (response) {
      $scope.editData = response.data.tentang;
    });
  }
  //   $scope.GetRowIndex = function (index) {
  //     $window.alert("Row Index: " + index);
  //   };
});
