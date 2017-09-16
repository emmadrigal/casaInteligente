
myHouse.service("smartModel", function($routeParams, $location, $http,$sce){

var json={}; 

var myURL = localStorage.getItem("url");    

this.updateDoors = function(jsonPrueba){
    json=jsonPrueba;
 
    
    if(jsonPrueba.puertaA == 0){
        document.getElementById("unlock1").style.visibility = 'hidden';
        document.getElementById("lock1").style.visibility = 'visible'
    }
    else{
        document.getElementById("unlock1").style.visibility = 'visible';
        document.getElementById("lock1").style.visibility = 'hidden'
    } 
    
    if(jsonPrueba.puertaB == 0){
        document.getElementById("unlock2").style.visibility = 'hidden';
        document.getElementById("lock2").style.visibility = 'visible'
    }
    else{
        document.getElementById("unlock2").style.visibility = 'visible';
        document.getElementById("lock2").style.visibility = 'hidden'
    } 
    if(jsonPrueba.puertaC == 0){
        document.getElementById("unlock3").style.visibility = 'hidden';
        document.getElementById("lock3").style.visibility = 'visible'
    }
    else{
        document.getElementById("unlock3").style.visibility = 'visible';
        document.getElementById("lock3").style.visibility = 'hidden'
    } 
    if(jsonPrueba.puertaD == 0){
        document.getElementById("unlock4").style.visibility = 'hidden';
        document.getElementById("lock1").style.visibility = 'visible'
    }
    else{
        document.getElementById("unlock4").style.visibility = 'visible';
        document.getElementById("lock4").style.visibility = 'hidden'
    } 
    if(jsonPrueba.puertaE == 0){
        document.getElementById("unlock5").style.visibility = 'hidden';
        document.getElementById("lock5").style.visibility = 'visible'
    }
    else{
        document.getElementById("unlock5").style.visibility = 'visible';
        document.getElementById("lock5").style.visibility = 'hidden'
    } 
    
    
    
    
}
this.takePicture=function(datos){
     console.log( myURL+'/pic.jpeg');
     $http({
                method: 'GET',
                url: myURL+'/pic.jpeg',
                headers: {'Content-Type' : 'application/json'} 
                })
                .then(function(result){
                     var myImage = new Image();
                     myImage.src = myURL+'/pic.jpeg';
                     document.body.appendChild(myImage);
                     var galeria = document.getElementById('galeria');
                     galeria.appendChild(myImage);
                }, function(error) {
                    console.log(error);
                });
}
this.bedroom1Change = function(){
            //document.getElementById("lock").style.visibility = 'hidden';
            var json= {
                "Change":"bedroom1"
            }
            console.log(json)
            $http({
                method: 'GET',
                url: myURL+'/ledsA',
                headers: {'Content-Type' : 'application/json'} 
                })
                
                .then(function(result){
                    console.log(result);
                }, function(error) {
                    console.log(error);
                });
    
}
this.bedroom2Change = function(){
            //document.getElementById("unlock").style.visibility = 'hidden';
            var json= {
                "Change":"Bedroom2"
            }
            console.log(json)
                        $http({
                method: 'GET',
                url: myURL+'/ledsB',
                headers: {'Content-Type' : 'application/json'} 
                })
                
                .then(function(result){
                    console.log(result);
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
                url: myURL+'/ledsC',
                headers: {'Content-Type' : 'application/json'},

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
                url: myURL+'/ledsD',
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
                url: myURL+'/ledsE',
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
                url: myURL+'/ledsF',
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
    
            console.log("all")

                if(!document.getElementById("all").checked){
                    document.getElementById("bedroom1").checked = true;
                    document.getElementById("bedroom2").checked = true;
                    document.getElementById("mainroom").checked = true;
                    document.getElementById("bathroom").checked = true;
                    document.getElementById("eatroom").checked = true;
                    document.getElementById("kitchen").checked = true;
                        
                    if(json.ledsA==1){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsA',
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
                    if(json.ledsB==1){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsB',
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
                    if(json.ledsC==1){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsC',
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
                    if(json.ledsD==1){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsD',
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
                    if(json.ledsE==1){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsE',
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
                    if(json.ledsF==1){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsF',
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
                    
                }
                else{
                    document.getElementById("bedroom1").checked = false;
                    document.getElementById("bedroom2").checked = false;
                    document.getElementById("mainroom").checked = false;
                    document.getElementById("bathroom").checked = false;
                    document.getElementById("eatroom").checked = false;
                    document.getElementById("kitchen").checked = false; 
                    if(json.ledsA==0){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsA',
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
                    if(json.ledsB==0){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsB',
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
                    if(json.ledsC==0){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsC',
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
                    if(json.ledsD==0){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsD',
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
                    if(json.ledsE==0){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsE',
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
                    if(json.ledsF==0){
                        $http({
                                method: 'POST',
                                url: myURL+'/ledsF',
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
                    
                }
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