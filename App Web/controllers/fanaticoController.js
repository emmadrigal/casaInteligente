myConcert.controller("fanaticoController", function($scope, $http,$sce, fanaticoModel){
        var datos={}
        var myURL ='http://192.168.0.12:1212';
        $scope.banda={};  
        

        
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
        $scope.changeBedroom1 = function(){
            fanaticoModel.bedroom1Change();
        }
        $scope.changeBedroom2 = function(){
            fanaticoModel.bedroom2Change();
        }
        $scope.changeMainRoom = function(){
            fanaticoModel.mainroomChange();
        }
           $scope.changeBathroom = function(){
            fanaticoModel.bathroomChange();
        }
            $scope.changeEatroom = function(){
            fanaticoModel.eatroomChange();
        }
             $scope.changeKitchen = function(){
            fanaticoModel.kitchenChange();
        }
             $scope.changeAll = function(){
            fanaticoModel.allChange();
        }
             $scope.takePicture = function(){
            fanaticoModel.takePicture(datos);
        }
             
        var requestLoop = setInterval(function(){
            $http({
                method: 'GET',
                url: myURL+'/info',
                headers: {'Content-Type' : 'application/json'} 
                })
                
                .then(function(result){
                    console.log(result);
                    fanaticoModel.updateDoors(result.data);

                }, function(error) {
                    console.log(error);
                });

        }, 20000);

             
    
});