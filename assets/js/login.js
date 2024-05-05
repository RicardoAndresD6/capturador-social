//Todo:: Author : Ricardo Diaz.

$(document).ready(function() {

    //Todo:: Login form
    $('#login_form').submit(function(e) {

        e.preventDefault();
        
        let username = $('#username').val();
        let password = $('#password').val();

        _validateLogin(username, password);
        
    });

});

//TODO:: Funcion para validar el login
function _validateLogin(username, password) {

    if(username == '' || password == '') {

        Swal.fire({
            icon: 'error',
            title: '¡Lo Sentimos!',
            text: 'Todos los campos son requeridos',
            showConfirmButton: false,
            timer: 2000
        });

        return;

    }else{

        //Se valida los usuarios
        if(username == 'ADMIN' && password == '000111' || username == 'ASISTENTE' && password == 'AAA000') {

            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Iniciando sesión...',
                showConfirmButton: false,
                timer: 2000
            });

            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'); 

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        }else{
                
            Swal.fire({
                icon: 'error',
                title: '¡Lo Sentimos!',
                text: 'Usuario y/o contraseña incorrectos',
                showConfirmButton: false,
                timer: 2000
            });

            //Limpiar campos
            $('#username').val('');
            $('#password').val('');
        }

    }

}