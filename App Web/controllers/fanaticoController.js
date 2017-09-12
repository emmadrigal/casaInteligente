myConcert.controller("fanaticoController", function($scope, $http,$sce, fanaticoModel){
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
          $scope.changeMainroom = function(){
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
    
});