//Todo:: Author : Ricardo Diaz.

//Todo::Metodo ready principal
$(document).ready(function() {
    
    //Todo::Metodo para generar la tabla del index con las fichas del localstorage
    generateTable();

    //Todo::Toast para mostrar mensajes
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });

    //Todo::Metodo para validar que solo se pueda seleccionar un genero
    $('.form-check-input').click(function() {
        $('.form-check-input').not(this).prop('checked', false);
    });

    //Todo::Metodo para validar el campo de rut en el formulario de ingreso de ficha
    $("#rut").rut().on('rutValido', function(e, rut, dv) {
        console.log("El rut " + rut + "-" + dv + " es válido");
    }).on('rutInvalido', function(e) {
        
        Swal.fire({
            icon: 'error',
            title: '¡Lo Sentimos!',
            text: 'El rut ingresado no es válido',
            showConfirmButton: false,
            timer: 2000
        });
        $('#rut').val('');

    });

    $('#editar-rut').rut().on('rutValido', function(e, rut, dv) {
        console.log("El rut " + rut + "-" + dv + " es válido");
    }).on('rutInvalido', function(e) {
        
        Swal.fire({
            icon: 'error',
            title: '¡Lo Sentimos!',
            text: 'El rut ingresado no es válido',
            showConfirmButton: false,
            timer: 2000
        });
        $('#editar-rut').val('');

    });

    //Todo::Metodo para crear ficha
    $('#form-crear-ficha').submit(function(e) {

        e.preventDefault();

        // Verifica cuál opción de género fue seleccionada
        let generoSeleccionado;
        let modal = $('#crearFicha');

        if ($('#femenino').is(':checked')) {
            generoSeleccionado = 'Femenino';
        } else if ($('#masculino').is(':checked')) {
            generoSeleccionado = 'Masculino';
        } else if ($('#otro').is(':checked')) {
            generoSeleccionado = 'Otro';
        }

        if (generoSeleccionado == null) {
            
            Swal.fire({
                icon: 'error',
                title: '¡Lo Sentimos!',
                text: 'Debe seleccionar un género',
                showConfirmButton: false,
                timer: 2000
            });
            return;

        }else{
        
            // Obtener los datos del formulario como un array de objetos
            let formArray = $(this).serializeArray();

            let formDataJSON = {};

            $.each(formArray, function(index, item) {
                formDataJSON[item.name] = item.value;
            });

            //Calcular la edad en base a la fecha de nacimiento
            let fechaNaci = new Date(formDataJSON['fecha_naci']);
            let edad = calcularEdad(fechaNaci);
        
            let ficha = {
                rut: formDataJSON['rut'],
                nombre: formDataJSON['nombre'],
                apellido: formDataJSON['apellido'],
                genero: generoSeleccionado,
                altura: formDataJSON['altura'],
                fecha_naci: formDataJSON['fecha_naci'],
                telefono: formDataJSON['telefono'],
                email: formDataJSON['email'],
                edad: edad,
                direccion: formDataJSON['direccion'],
                comuna: formDataJSON['comuna'],
                educacion_basica: formDataJSON['educacion_basica'],
                educacion_media: formDataJSON['educacion_media'],
                renta_mensual: formDataJSON['renta_mensual'],
                trabajando: formDataJSON['trabajando'],
                anos_experiencia: formDataJSON['anos_experiencia'],
            };
            
            let url = 'http://capturador-social.test/api/index.php?action=crear';

            //AJAX para guardar la ficha en la base de datos
            $.ajax({
                url: url,
                type: 'POST',
                data: ficha,
                success: function(response) {

                    let data = JSON.parse(response);

                    if(data.status == 'success'){
                        
                        Toast.fire({
                            icon: 'success',
                            title: data.message
                        });

                        generateTable();

                    }else if(data.status == 'error'){

                        Toast.fire({
                            icon: 'error',
                            title: data.message
                        });
                    }

                    modal.modal('hide'); 

                },
                error: function(error) {
                    console.error(error);
                    Toast.fire({
                        icon: 'error',
                        title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al guardar la ficha. Por favor, inténtelo de nuevo.'
                    });
                }
            });

        }

    });

    //Todo::Metodo para editar ficha
    $('#form-editar-ficha').submit(function(e) {
        e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, editar ficha'
        }).then((result) => {
            if (result.isConfirmed) {

                // Obtener los datos del formulario como un array de objetos
                let formArray = $(this).serializeArray();

                let rowId = $('#editar-ficha-id').val();

                let formDataJSON = {};

                $.each(formArray, function(index, item) {
                    formDataJSON[item.name] = item.value;
                });

                let fechaNaci = new Date(formDataJSON['editar_fecha_naci']);
                let edad = calcularEdad(fechaNaci);
                
                // Verifica cuál opción de género fue seleccionada
                let generoSeleccionado;

                if ($('#editar-femenino').is(':checked')) {
                    generoSeleccionado = 'Femenino';
                } else if ($('#editar-masculino').is(':checked')) {
                    generoSeleccionado = 'Masculino';
                } else if ($('#editar-otro').is(':checked')) {
                    generoSeleccionado = 'Otro';
                }

                let ficha = {
                    rut: formDataJSON['editar-rut'],
                    nombre: formDataJSON['editar-nombre'],
                    apellido: formDataJSON['editar-apellido'],
                    genero: generoSeleccionado,
                    altura: formDataJSON['editar-altura-hidden'],
                    fecha_naci: formDataJSON['editar_fecha_naci'],
                    telefono: formDataJSON['editar-telefono'],
                    email: formDataJSON['editar-email'],
                    edad: edad,
                    direccion: formDataJSON['editar-direccion'],
                    comuna: formDataJSON['editar-comuna'],
                    educacion_basica: formDataJSON['editar_educacion_basica'],
                    educacion_media: formDataJSON['editar_educacion_media'],
                    renta_mensual: formDataJSON['editar_renta_mensual'],
                    trabajando: formDataJSON['editar-trabajando'],
                    anos_experiencia: formDataJSON['editar_anos_experiencia'],
                };
    
                let url = 'http://capturador-social.test/api/index.php?action=editar';

                //AJAX para editar la ficha en la base de datos
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: { id: rowId, ficha: ficha },
                    success: function(response) {

                        let data = JSON.parse(response);

                        if(data.status == 'success'){

                            Toast.fire({
                                icon: 'success',
                                title: data.message
                            });

                            generateTable();

                        }else if(data.status == 'error'){

                            Toast.fire({
                                icon: 'error',
                                title: data.message
                            });
                        }

                        $('#editarFicha').modal('hide');

                    },error: function(error) {
                        console.error(error);
                        Toast.fire({
                            icon: 'error',
                            title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al editar la ficha. Por favor, inténtelo de nuevo.'
                        });
                    }

                });

            }

        });

    });

    //Todo::Metodo para limpiar el eliminar todas las fichas de la tabla
    $('.eliminar-toda-tabla').click(function() {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar todas las fichas'
        }).then((result) => {
            if (result.isConfirmed) {

                let url = 'http://capturador-social.test/api/index.php?action=eliminar_todos';

                //AJAX para eliminar todas las fichas de la base de datos
                $.ajax({
                    url: url,
                    type: 'POST',
                    success: function(response) {

                        let data = JSON.parse(response);
                        
                        if(data.status == 'success'){
                            Toast.fire({
                                icon: 'success',
                                title: data.message
                            });

                            generateTable();

                        }else if(data.status == 'error'){

                            Toast.fire({
                                icon: 'error',
                                title: data.message
                            });

                        }

                    },error: function(error) {
                        console.error(error);
                        Toast.fire({
                            icon: 'error',
                            title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al eliminar todas las fichas. Por favor, inténtelo de nuevo.'
                        });
                    }

                });

            }
        });

    });

    //Todo::Metodo para limpiar el boton al cerrar el modal
    $('#crearFicha').on('hidden.bs.modal', function() {
        $('#form-crear-ficha').trigger('reset');
    });

    $("#crearFicha").on('hide.bs.modal', function (e) {
        $(document.body).removeClass('modal-open');
        $('.modal-backdrop').remove();
    });

    //Todo::Metodo para limpiar el modal de informacion de la ficha al cerrar
    $('#verFicha').on('hidden.bs.modal', function() {
        $('verFichaLabel').text('');
        $('#nombre-apellido').text('');
        $('#info-rut').text('');
        $('#info-email').text('');
        $('#info-telefono').text('');
        $('#info-fecha-naci').text('');
        $('#info-edad').text('');
        $('#info-genero').text('');
        $('#info-altura').text('');
        $('#info-comuna').text('');
        $('#info-direccion').text('');
        $('#info-estudios-basicos').text('');
        $('#info-estudios-medios').text('');
        $('#info-anos-experiencia').text('');
        $('#info-esta-trabajando').text('');
        $('#info-renta-mensual').text('');
    });

    //Todo::Metodo para ver una ficha de la tabla
    $('#fichas_table').on('click', '.ver-ficha-btn', function() {

        let rowId = $(this).data('ver');

        let url = 'http://capturador-social.test/api/index.php?action=listar';

        $.ajax({
            
            url: url,
            type: 'POST',
            data: { id: rowId },

            success: function(response) {

                let data = JSON.parse(response);

                let ficha = data[0];

                let fechaNaci = new Date(ficha.fecha_naci);

                let diferenciaZonaHoraria = fechaNaci.getTimezoneOffset() * 60 * 1000;
                fechaNaci = new Date(fechaNaci.getTime() + diferenciaZonaHoraria);

                // Obtener día, mes y año
                let dia = fechaNaci.getDate().toString().padStart(2, '0'); 
                let mes = (fechaNaci.getMonth() + 1).toString().padStart(2, '0');
                let año = fechaNaci.getFullYear();

                let fechaNaciFormatted = `${dia}/${mes}/${año}`;

                let rentaFormatted = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(
                    ficha.renta_mensual
                );

                $('#verFichaLabel').text('Información Ficha N° ' + ficha.id);

                let modal = $('#verFicha');

                modal.find('#nombre-apellido').text(ficha.nombre + ' ' + ficha.apellido);
                modal.find('#info-rut').text(ficha.rut);
                modal.find('#info-email').text(ficha.email);
                modal.find('#info-telefono').text('+ 56 ' + ficha.telefono);
                modal.find('#info-fecha-naci').text(fechaNaciFormatted);
                modal.find('#info-edad').text(ficha.edad + ' AÑOS');
                modal.find('#info-genero').text(ficha.genero.toUpperCase());
                modal.find('#info-altura').text(ficha.altura + ' CM');
                modal.find('#info-comuna').text(ficha.comuna.toUpperCase());
                modal.find('#info-direccion').text(ficha.direccion.toUpperCase());
                modal.find('#info-estudios-basicos').text(ficha.educacion_basica + '° BÁSICA');
                modal.find('#info-estudios-medios').text(ficha.educacion_media + '° MEDIO');
                modal.find('#info-anos-experiencia').text(ficha.anos_experiencia + ' AÑOS');
                modal.find('#info-esta-trabajando').text(ficha.trabajando.toUpperCase());
                modal.find('#info-renta-mensual').text(rentaFormatted);

                modal.modal('show');

            },error: function(error) {
                console.error(error);
                Toast.fire({
                    icon: 'error',
                    title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al lista la ficha seleccionada. Por favor, inténtelo de nuevo.'
                });
            }

        });

    });

    //Todo::Metodo para eliminar una ficha de la tabla
    $('#fichas_table').on('click', '.delete-btn', function() {

        let rowId = $(this).data('delete');

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar esta ficha'
        }).then((result) => {
            if (result.isConfirmed) {

                let url = 'http://capturador-social.test/api/index.php?action=eliminar';

                //AJAX para eliminar la ficha de la base de datos
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: { id: rowId },
                    success: function(response) {

                        let data = JSON.parse(response);
                        
                        if(data.status == 'success'){
                            
                            Toast.fire({
                                icon: 'success',
                                title: data.message
                            });

                            generateTable();

                        }else if(data.status == 'error'){

                            Toast.fire({
                                icon: 'error',
                                title: data.message
                            });

                        }

                    },error: function(error) {
                        console.error(error);
                        Toast.fire({
                            icon: 'error',
                            title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al eliminar la ficha. Por favor, inténtelo de nuevo.'
                        });
                    }

                });

            }
        });

    });

    //Todo::Metodo para limpiar el modal de editar ficha al cerrar
    $('#editarFicha').on('hidden.bs.modal', function() {
        $('#editarFichaLabel').text('');
        $('#editar-nombre').val('');
        $('#editar-apellido').val('');
        $('#editar-rut').val('');
        $('#editar_fecha_naci').val('');
        $('#editar-telefono').val('');
        $('#editar-email').val('');
        $('#editar-comuna').val('');
        $('#editar-direccion').val('');
        $('#editar-femenino').prop('checked', false);
        $('#editar-masculino').prop('checked', false);
        $('#editar-otro').prop('checked', false);
        $('#editar-altura').val('');
        $('#editar_anos_experiencia').val('');
        $('#editar_educacion_basica').val('');
        $('#editar_educacion_media').val('');
        $('#editar-trabajando').val('');
        $('#editar_renta_mensual').val('');

    });

    //Todo::Metodo para editar una ficha de la tabla
    $('#fichas_table').on('click', '.editar-ficha-btn', function() {

        let rowId = $(this).data('editar');

        let url = 'http://capturador-social.test/api/index.php?action=listar';

        $.ajax({
            url: url,
            type: 'POST',
            data: { id: rowId },
            success: function(response) {

                let data = JSON.parse(response); 

                let ficha = data[0];

                let alturaFormatted = ficha.altura * 100;
                let renta_sin_punto = ficha.renta_mensual.toString().replace('.', '');

                mostrarAlturaEditar(alturaFormatted);

                $('#editarFichaLabel').text('Editar Ficha N° ' + ficha.id);
                $('#editar-ficha-id').val(ficha.id);

                let modal = $('#editarFicha');

                modal.find('#editar-nombre').val(ficha.nombre);
                modal.find('#editar-apellido').val(ficha.apellido);
                modal.find('#editar-rut').val(ficha.rut);
                modal.find('#editar_fecha_naci').val(ficha.fecha_naci);
                modal.find('#editar-telefono').val(ficha.telefono);
                modal.find('#editar-email').val(ficha.email);
                modal.find('#editar-comuna').val(ficha.comuna);
                modal.find('#editar-direccion').val(ficha.direccion);
                modal.find('#editar_anos_experiencia').val(ficha.anos_experiencia);
                modal.find('#editar-altura').val(alturaFormatted); 
                modal.find('#editar_educacion_basica').val(ficha.educacion_basica);
                modal.find('#editar_educacion_media').val(ficha.educacion_media);
                modal.find('#editar-trabajando').val(ficha.trabajando);
                modal.find('#editar_renta_mensual').val(renta_sin_punto);

                // Verifica cuál opción de género fue seleccionada
                if (ficha.genero === 'Femenino') {
                    modal.find('#editar-femenino').prop('checked', true);
                } else if (ficha.genero === 'Masculino') {
                    modal.find('#editar-masculino').prop('checked', true);
                } else if (ficha.genero === 'Otro') {
                    modal.find('#editar-otro').prop('checked', true);
                }

                modal.modal('show');

            },error: function(error) {
                console.error(error);
                Toast.fire({
                    icon: 'error',
                    title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al editar la ficha seleccionada. Por favor, inténtelo de nuevo.'
                });
            }

        });

    });

});

//Todo::Funcion para calcular Altura
function mostrarAltura(valor) {
    // Calcula la altura en centímetros
    var alturaCm = Math.round(valor) / 100;
    $("#alturaMostrada").text("Altura: " + alturaCm + " cm");
    $("#altura_hidden").val(alturaCm);
}

function mostrarAlturaEditar(valor) {
    // Calcula la altura en centímetros
    var alturaCm = Math.round(valor) / 100;
    $("#editarAlturaMostrada").text("Altura: " + alturaCm + " cm");
    $("#editar-altura-hidden").val(alturaCm);
}

//Todo::Funcion para generar la tabla del index con las fichas del localstorage
function generateTable() {

    let url = 'http://capturador-social.test/api/index.php?action=listar_todos';

    //AJAX para listar las fichas de la base de datos
    $.ajax({
        url: url,
        type: 'POST',
        success: function(response) {

            let data = JSON.parse(response);

            localStorage.setItem('fichas', JSON.stringify(data));

             //Destruir la tabla si ya existe
            if ($.fn.DataTable.isDataTable('#fichas_table')) {
                $('#fichas_table').DataTable().destroy();
            }

            $('#fichas_table').DataTable({
                data: data, 
                language: spanish, 
                columns: [ 
                    { data : 'id', className: 'text-center',},
                    { data: 'rut' },
                    { data: 'nombre' },
                    { data: 'comuna' },
                    { data: 'email' },
                    { data: 'direccion' },
                    { data: 'telefono' },
                    {
                        data: null,
                        render: function(data, type, row, meta) {
                            return generateButtons(data.id);

                        }
                    }
                ]
            });

        },
        error: function(error) {
            console.error(error);
            Toast.fire({
                icon: 'error',
                title: '¡Lo Sentimos! Ha ocurrido un error en el servicio al listar las fichas. Por favor, inténtelo de nuevo.'
            });
        }
    });
}

//Todo::Idioma español para la tabla
const spanish = {
    "decimal":        "",
    "emptyTable":     "No hay datos disponibles en la tabla",
    "info":           "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "infoEmpty":      "Mostrando 0 a 0 de 0 registros",
    "infoFiltered":   "(filtrado de _MAX_ registros totales)",
    "infoPostFix":    "",
    "thousands":      ",",
    "lengthMenu":     "Mostrar _MENU_ registros por página",
    "loadingRecords": "Cargando...",
    "processing":     "Procesando...",
    "search":         "Buscar:",
    "zeroRecords":    "No se encontraron registros coincidentes",
    "paginate": {
        "first":      "Primero",
        "last":       "Último",
        "next":       "Siguiente",
        "previous":   "Anterior"
    },
    "aria": {
        "sortAscending":  ": activar para ordenar la columna ascendente",
        "sortDescending": ": activar para ordenar la columna descendente"
    }
};

//Todo::Funcion para generar los botones de la tabla
function generateButtons(rowId) {

    return '<div class="d-flex justify-content-around">' +
        '<a class="btn btn-warning btn-sm ver-ficha-btn" title="Ver Ficha" data-ver="'+rowId+'"><i class="fa-solid fa-eye text-white"></i></a>' +
        '<a class="btn btn-primary btn-sm editar-ficha-btn" title="Editar Ficha" data-editar="'+rowId+'"><i class="fa-solid fa-pen-to-square"></i></a>' +
        '<a class="btn btn-danger btn-sm delete-btn" title="Eliminar Ficha" data-delete="' + rowId + '"><i class="fa-solid fa-trash"></i></a>' +
        '</div>';
}

//Todo::Funcion para calcular Edad
function calcularEdad(fechaNacimiento) {
    let fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    return edad;
}