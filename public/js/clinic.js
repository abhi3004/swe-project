angular.module("clinic",['ngRoute'])
.config(function($routeProvider){

$routeProvider
    .when("/", {
        templateUrl : "templates/addpatients.html"
    })
     .when("/inventory", {
        templateUrl : "templates/inventory.html"
    })
    .when("/docschedule",{
        templateUrl : "templates/docschedule.html"
    })
    .when("/addpatient",{
        templateUrl : "templates/addpatient.html"
    })
    
    .otherwise({
        redirectTo: "/"
    })
}

)
.controller("addpatientCtrl",addpatientCtrl)
