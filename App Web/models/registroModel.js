myConcert.service("registroModel", function($routeParams, $location, $http){
var myURL = localStorage.getItem("url");

    
this.verificarUsuario = function(usuarioLogin){  
    localStorage.setItem("userName",usuarioLogin.login); 
    var Credenciales = {
                        "username":usuarioLogin.login,
                        "password":usuarioLogin.password
                        };
    console.log(Credenciales);
    $http({
    method: 'POST',
    url: myURL+"/api/login",
    headers: {'Content-Type' : 'application/json'},
    data: Credenciales
    }).then(function(result){
            if (result.data.success) {
                      window.location.href = "#vistaFanatico";
                  
                }
        
            else alert(result.data.detail+ "Contaseña Incorrecta" )
    }, function(error) {
        console.log(error);
    });
}



   
this.crearUsuario = function (usuario) {
    var UsuarioACrear;
        UsuarioACrear = {
                    "role":              "fanatico",
                    "user_data":
                           {   
                            "username":          usuario.nombreUsuario,
                            "password":          usuario.Contrasena,
                           },

                    };
        console.log(UsuarioACrear);
        window.location.href = "#vistaFanatico";
        $http({
                method: 'POST',
                url: myURL+"/API/Usuarios",
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: UsuarioACrear
                }).then(function(result){
                    if (result.data.success){
                        alert("Usuario Creado");
                            window.location.href = "#vistaFanatico";
                        }

                    else {alert(result.data.detail);}
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
