angular.module("app",['ngRoute'])
.config(function($routeProvider){

$routeProvider
    .when("/plain", {
        templateUrl : "templates/plain.html"
    })
     .when("/signup", {
        templateUrl : "templates/signup.html"
    })
    .when("/addnew",{
        templateUrl : "templates/addnew.html"
    })
    .when("/about",{
        templateUrl : "templates/about.html"
    })
    
    .otherwise({
        redirectTo: "/"
    })
})

.controller("mainctrl",mainctrl)
function mainctrl(){
    var main=this;
    main.registerClinic=function(){
        console.log("hfjg");
    }
}



