// Speicher Values in Array bei click
'use strict';
var values = [];
var app = angular.module('dummy', []);


$(document).on('click', '#main li', function(event) {
    event.preventDefault();
    name = $(this).find("h4").text();
    id = $(this).attr("id");
    values = {
        "name": name,
        "_id": id,
        "attr": []
    };
    $(this).find('div').each(function() {
        var heightInPx = $(this).css('height');
        var height = parseInt(heightInPx.replace('px', '')) * parseInt($('.weights input[type="radio"]:checked').val());
        values.attr.push(height);
    })
    // Das ist nur um die werte mal in der Console anzeigen zu lassen
    .promise().done(function() {
        console.log(values);
    });
});

// Angular Database Requests
// Holt die Clubs (samt Eigenschaften) aus einem json und speichert sie für angular lesbar 
app.controller('ClubsCtrl', function($scope, $http) {
    $http.get('./db/clubs.json').then(function(clubsResponse) {
        $scope.clubs = clubsResponse.data;
    });
})
// Holt die Benutzer (samt Eigenschaften) aus einem json und speichert sie für angular lesbar 
app.controller('UsersCtrl', function($scope, $http) {
    $http.get('./db/users.json').then(function(usersResponse) {
        $scope.users = usersResponse.data;
    });
});
// Die beiden JSONs sollten dann später (serverseitig) aus der DB erzeugt werden