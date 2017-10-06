angular.module("register",[])
.controller("regClinicCtrl",regClinicCtrl)
function regClinicCtrl($scope,$http,$window){
    var regClinic=this;
    regClinic.test=function(){
    console.log(regClinic.name);
    }
    regClinic.postdata = function (name, address,pin,district,pno1,pno2,email,password) {
    data = {
    name: name,
    address: address,
    pin: pin,
    district: district,
    pno1:pno1,
    pno2:pno2,
    email:email,
    password:password
    };
    console.log(data);

    $http.post('/api/clinic/post', JSON.stringify(data)).then(function (response) {
    if (response.data){
        $window.location.href = '/';
    console.log("Post Data Submitted Successfully!");}

    }
    , function (response) {
    console.log("Service not Exists");
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();

    });

};
regClinic.finddata=function(){
    data={};
    $http.post('/api/clinic/login', JSON.stringify(data)).then(function (response) {
if (response.data){
    
console.log("Post Data Submitted Successfully!");}

}
, function (response) {
console.log("Service not Exists");
$scope.statusval = response.status;
$scope.statustext = response.statusText;
$scope.headers = response.headers();

});
}
}