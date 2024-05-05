//Todo:: Author : Ricardo Diaz.

//Todo::Metodo ready principal
$(document).ready(function() {
    
    //Todo::Metodo para generar las cards del index con las fichas del localstorage
    generateCards();

});


//TODO::Metodo para generar las cards del index con las fichas del localstorage
function generateCards() {
    let fichas = JSON.parse(localStorage.getItem('fichas'));
    let count = 0;
    let generoFemenino = 0;
    let generoMasculino = 0;

    if (fichas) {
        count = fichas.length;

        fichas.forEach(ficha => {
            let genero = ficha.genero;

            if (genero === 'Femenino') {
                generoFemenino++;
            } else if (genero === 'Masculino') {
                generoMasculino++;
            }
        });
    }

    $('#usuarios_regis').html(count);
    $('#cant_mujeres').html(generoFemenino);
    $('#cant_hombres').html(generoMasculino);
}