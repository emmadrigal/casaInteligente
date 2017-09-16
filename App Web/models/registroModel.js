myHouse.service("registroModel", function($routeParams, $location, $http){
var myURL = localStorage.getItem("url");

    
this.verificarUsuario = function(usuarioLogin){  
    localStorage.setItem("userName",usuarioLogin.login); 
    var Credenciales = {
                        "username":usuarioLogin.login,
                        "password":usuarioLogin.password
                        };
    console.log(Credenciales);
    var encrypt=CryptoJS.MD5(usuarioLogin.password);
    console.log(encrypt.toString);
    window.location.href = "#smartHouse"
   
}



   
this.crearUsuario = function (usuario) {
    var UsuarioACrear;
        UsuarioACrear = {
                    "user_data":
                           {   
                            "username":          usuario.nombreUsuario,
                            "password":          usuario.Contrasena,
                           },

                    };
        console.log(UsuarioACrear);
        window.location.href = "#smartHouse";

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
