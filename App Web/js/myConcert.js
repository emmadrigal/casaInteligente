localStorage.setItem("url","http://192.168.43.30:12345");
var configMyConcert = function($routeProvider){

    $routeProvider
        .when("/registroForm", {
            controller: "registroController",
            templateUrl: "views/registroView.html"
        })
        
        .when("/vistaFanatico", {
            controller: "fanaticoController",
            templateUrl: "views/fanaticoView.html"
        }) 

    ;
}
 
//creamos el modulo y le aplicamos la configuración
var myConcert = angular.module("myConcert",  ['ngAnimate', 'ngAria', 'ui.bootstrap', 'ngMaterial', 'ngMessages', 'ngRoute', 'ui.router']).config(configMyConcert);


