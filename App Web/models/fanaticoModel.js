myConcert.service("fanaticoModel", function($routeParams, $location, $http,$sce){

var myURL =localStorage.getItem("url");  
 
this.bedroom1Change = function(){

            var json= {
                "Change":"bedroom1"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}
this.bedroom2Change = function(){

            var json= {
                "Change":"Bedroom2"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}
this.bathroomChange = function(){
            var json= {
                "Change":"bathroom"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}
this.kitchenChange = function(){

            var json= {
                "Change":"kitchen"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}
this.eatroomChange = function(){

            var json= {
                "Change":"eatroom"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}
this.mainroomChange = function(){

            var json= {
                "Change":"mainroom"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}
this.allChange = function(){

            var json= {
                "Change":"all"
            }
            console.log(json)
    $http({
                method: 'POST',
                url: myURL+"/API/Votaciones",
                headers: {'Content-Type' : 'application/json'},
                data: json
                })
                
                .then(function(result){
                    if (result.data.success){
                        alert(result.data.detail);

                    }
                    else alert(result.data.detail);

                }, function(error) {
                    console.log(error);
                });
                
    
}

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);


});

    
});