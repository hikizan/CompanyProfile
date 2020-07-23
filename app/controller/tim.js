var app = angular.module("CompanyProfile", []);

app.controller("TeamController", function ($scope, $http) {
  $http.get("/team/").then(function (response) {
    $scope.teams = response.data;
  });

  // delete a team after checking it
  $scope.delteam = function (id) {
    $http.delete("/team/" + id).then(function (data) {
      location.reload();
    });
  };

  $scope.Uptim = function () {
    $http.put("/team/" + $scope.UpData.id, $scope.UpData).then(function (data) {
      // clear the form so our user is ready to enter another
      $scope.UpData = {};
    });
  };

  var arrURL = window.location.href.split("/");
  let ID = arrURL[arrURL.length - 1];
  var page = arrURL[arrURL.length - 2];

  if (ID != undefined && page == "edit_tim") {
    $http.get("/team/" + ID).then(function (response) {
      $scope.editData = response.data.team;
    });
  }
  const urlParams = new URLSearchParams(window.location.search);
  const err = urlParams.get("error");
  if (err == 11000) {
    document.querySelector("#validasi").removeAttribute("hidden");
  }
  $scope.GetRowIndex = function (index) {
    $window.alert("Row Index: " + index);
  };
});
