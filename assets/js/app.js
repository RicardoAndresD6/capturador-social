//Todo:: Author : Ricardo Diaz.

//Todo::Metodo ready principal
$(document).ready(function() {

    //Todo::Validar si existe un token en el localstorage
    let token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
    }

    //Todo::Metodo para mostrar el tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();

    //Todo::Metodo para cerrar sesion
    $('.log-out').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });



});

