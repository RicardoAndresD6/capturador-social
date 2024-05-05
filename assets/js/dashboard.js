
//Todo:: Author : Ricardo Diaz.

//Todo::Metodo ready principal
$(document).ready(function() {

    //Todo::Metodo para generar el card de cantidad de personas.
    generateCardPersonas();

    //Todo::Metodo para generar el card de promedio de edades.
    generateCardEdades();

    //Todo::Metodo para generar el card de promedio de rentas mensuales en CLP.
    generateCardRentas();
    
    //Todo::Metodo para generar el chart de personas por curso basica.
    generateChartBasica();

    //Todo::Metodo para generar el chart de personas por curso media.
    generateChartMedia();

    //Todo::Metodo para generar el card del cantidades de personas sin basica.
    generateCardSinBasica();

    //Todo::Metodo para generar el card del cantidades de personas sin media.
    generateCardSinMedia();
    
    //Todo::Metodo para generar el card de cantidades de personas trabajando.
    generateCardTrabajando();

    //Todo::Metodo para generar el card de promedio de personas con experiencia.
    generateCardExperiencia();

});

//Todo::Metodo para generar el chart de personas por curso basico del dashboard con las fichas del localstorage
function generateChartBasica() {

    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let primero_basico = 0;
    let segundo_basico = 0;
    let tercero_basico = 0;
    let cuarto_basico = 0;
    let quinto_basico = 0;
    let sexto_basico = 0;
    let septimo_basico = 0;
    let octavo_basico = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            if(ficha.educacion_basica == '1') {
                primero_basico++;
            }else if(ficha.educacion_basica == '2') {
                segundo_basico++;
            }else if(ficha.educacion_basica == '3') {
                tercero_basico++;
            }else if(ficha.educacion_basica == '4') {
                cuarto_basico++;
            }else if(ficha.educacion_basica == '5') {
                quinto_basico++;
            }else if(ficha.educacion_basica == '6') {
                sexto_basico++;
            }else if(ficha.educacion_basica == '7') {
                septimo_basico++;
            }else if(ficha.educacion_basica == '8') {
                octavo_basico++;
            }
        
        });

        const ctx_basica = $('#chart_curso_basica');

        new Chart(ctx_basica, {
            type: 'bar',
            data: {
                labels: ['1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'],
                datasets: [{
                    label: '# De Personas Por Curso Básico',
                    data: [primero_basico,segundo_basico,tercero_basico,cuarto_basico,quinto_basico,sexto_basico,septimo_basico,octavo_basico],
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.7)', 
                        'rgba(255, 165, 0, 0.7)', 
                        'rgba(255, 255, 0, 0.7)', 
                        'rgba(0, 128, 0, 0.7)', 
                        'rgba(0, 166, 255, 0.7)', 
                        'rgba(75, 0, 130, 0.7)', 
                        'rgba(238, 130, 238, 0.7)', 
                        'rgba(255, 192, 203, 0.7)' 
                    ]
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

//Todo::Metodo para generar el chart de personas por curso medio del dashboard con las fichas del localstorage
function generateChartMedia() {

    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let primero_medio = 0;
    let segundo_medio = 0;
    let tercero_medio = 0;
    let cuarto_medio = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            if(ficha.educacion_media == '1') {
                primero_medio++;
            }else if(ficha.educacion_media == '2') {
                segundo_medio++;
            }else if(ficha.educacion_media == '3') {
                tercero_medio++;
            }else if(ficha.educacion_media == '4') {
                cuarto_medio++;
            }
        
        });

        const ctx_media = $('#chart_curso_media');

        new Chart(ctx_media, {
            type: 'bar',
            data: {
                labels: ['1° Medio', '2° Medio', '3° Medio', '4° Medio'],
                datasets: [{
                    label: '# De Personas Por Curso Medio',
                    data: [primero_medio,segundo_medio,tercero_medio,cuarto_medio],
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(56, 156, 183, 0.7)', 
                        'rgba(147, 108, 0, 0.7)', 
                        'rgba(255, 255, 0, 0.7)', 
                        'rgba(0, 128, 0, 0.7)'
                    ]
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }

}

//Todo::Metodo para generar el card de cantidad de personas del dashboard con las fichas del localstorage
function generateCardPersonas() {

    let fichas = JSON.parse(localStorage.getItem('fichas'));
    let hombres = 0;
    let mujeres = 0;
    let otros = 0;

    if (fichas) {
        
        fichas.forEach(ficha => {

            let genero = ficha.genero;

            if (genero === 'Femenino') {
                mujeres++;
            } else if (genero === 'Masculino') {
                hombres++;
            } else {
                otros++;
            }

        });

        $('#cant-users-hombres').html(hombres);
        $('#cant-users-mujeres').html(mujeres);
        $('#cant-users-otros').html(otros);

    }

}

//Todo::Metodo para generar el card de promedio de edades del dashboard con las fichas del localstorage
function generateCardEdades(){

    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let hombres = 0;
    let mujeres = 0;
    let otros = 0;
    let promedio_hombres = 0;
    let promedio_mujeres = 0;
    let promedio_otros = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            let genero = ficha.genero;
            let edad = parseInt(ficha.edad);

            if (genero === 'Femenino') {
                mujeres++;
                promedio_mujeres += edad;
            } else if (genero === 'Masculino') {
                hombres++;
                promedio_hombres += edad;
            } else {
                otros++;
                promedio_otros += edad;
            }
        });

        promedio_hombres = promedio_hombres / hombres;
        promedio_mujeres = promedio_mujeres / mujeres;
        promedio_otros = promedio_otros / otros;

        $('#promedio-edad-hombres').html(promedio_hombres);
        $('#promedio-edad-mujeres').html(promedio_mujeres);
        $('#promedio-edad-otros').html(promedio_otros);

    }

}

//Todo::Metodo para generar el card de promedio de rentas mensuales en CLP del dashboard con las fichas del localstorage
function generateCardRentas(){
    
    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let total_renta = 0;
    let max_renta = Number.MIN_SAFE_INTEGER;
    let min_renta = Number.MAX_SAFE_INTEGER;
    let promedio_renta = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            let renta = parseInt(ficha.renta_mensual);

            total_renta += renta;
            max_renta = Math.max(max_renta, renta);
            min_renta = Math.min(min_renta, renta);

        });

        promedio_renta = total_renta / fichas.length;

        max_renta_formated = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(
            max_renta
        );

        min_renta_formated = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(
            min_renta
        );

        promedio_renta_formated = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(
            promedio_renta
        );

        $('#promedio-renta-baja').html(min_renta_formated);
        $('#promedio-renta-alta').html(max_renta_formated);
        $('#promedio-renta-promedio').html(promedio_renta_formated);

    }

}

//Todo::Metodo para generar el card de cantidades de personas sin educacion basica del dashboard con las fichas del localstorage
function generateCardSinBasica(){

    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let sin_basica = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            if(ficha.educacion_basica < '8') {
                sin_basica++;
            }
        
        });

        $('#cant-personas-sin-basica').html(sin_basica);

    }

}

//Todo::Metodo para generar el card de cantidades de personas sin educacion media del dashboard con las fichas del localstorage
function generateCardSinMedia(){
    
    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let sin_media = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            if(ficha.educacion_media < '4') {
                sin_media++;
            }
        
        });

        $('#cant-personas-sin-media').html(sin_media);

    }
}

//Todo::Metodo para generar el card de cantidades de personas trabajando del dashboard con las fichas del localstorage
function generateCardTrabajando(){
    
    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let trabajando = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            if(ficha.trabajando == 'Si') {
                trabajando++;
            }
        
        });

        $('#cant-personas-trabajando').html(trabajando);

    }

}

//Todo::Metodo para generar el card de promedio de personas con experiencia del dashboard con las fichas del localstorage
function generateCardExperiencia(){

    let fichas = JSON.parse(localStorage.getItem('fichas'));

    let total_experiencia = 0;
    let promedio_experiencia = 0;

    if (fichas) {

        fichas.forEach(ficha => {

            let experiencia = parseInt(ficha.anos_experiencia);

            total_experiencia += experiencia;

        });

        promedio_experiencia = total_experiencia / fichas.length;

        $('#cant-anos-experiencia').html(promedio_experiencia);

    }

}