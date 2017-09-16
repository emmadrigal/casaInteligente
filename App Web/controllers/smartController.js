myHouse.controller("smartController", function($scope, $http,$sce, smartModel){
        var datos={}
        var myURL ='http://192.168.0.12:1212';
        $scope.banda={};  
        

        
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
        $scope.changeBedroom1 = function(){
            smartModel.bedroom1Change();
        }
        $scope.changeBedroom2 = function(){
            smartModel.bedroom2Change();
        }
        $scope.changeMainRoom = function(){
            smartModel.mainroomChange();
        }
           $scope.changeBathroom = function(){
            smartModel.bathroomChange();
        }
            $scope.changeEatroom = function(){
            smartModel.eatroomChange();
        }
             $scope.changeKitchen = function(){
            smartModel.kitchenChange();
        }
             $scope.changeAll = function(){
            smartModel.allChange();
        }
             $scope.takePicture = function(){
            smartModel.takePicture(datos);
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