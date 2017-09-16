localStorage.setItem("url","http://192.168.0.12:1212");
var configMyHouse    = function($routeProvider){

    $routeProvider
        .when("/registroForm", {
            controller: "registroController",
            templateUrl: "views/registroView.html"
        })
        
        .when("/smartHouse", {
            controller: "smartController",
            templateUrl: "views/smartView.html"
        }) 

    ;
}
 
//creamos el modulo y le aplicamos la configuración
var myHouse = angular.module("myHouse",  ['ngAnimate', 'ngAria', 'ui.bootstrap', 'ngMaterial', 'ngMessages', 'ngRoute', 'ui.router']).config(configMyHouse);


