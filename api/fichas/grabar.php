<?php


/**
 * Función para crear una ficha
 * @Param array $datos
 * @Return JSON
 */
function crear($datos){

    // Configuración de la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "27539153RicD6";
    $database = "capturador_social";
    
    $res = [];

    // Conexión a la base de datos
    $mysql = new mysqli($servername, $username, $password, $database);

    // Verificar la conexión
    if ($mysql->connect_errno) {
        throw new Exception("Falló la conexión a MySQL: " . $mysql->connect_error);
    }

    //Datos de la ficha
    $nombre = $datos['nombre'] ?? '';
    $apellido = $datos['apellido'] ?? '';
    $rut = $datos['rut'] ?? '';
    $genero = $datos['genero'] ?? '';
    $altura = $datos['altura'] ?? 0;
    $fecha_nacimiento = $datos['fecha_naci'] ?? '';
    $telefono = $datos['telefono'] ?? '';
    $email = $datos['email'] ?? '';
    $edad = $datos['edad'] ?? 0;
    $direccion = $datos['direccion'] ?? '';
    $comuna = $datos['comuna'] ?? '';
    $educacion_basica = $datos['educacion_basica'] ?? 0;
    $educacion_media = $datos['educacion_media'] ?? 0;
    $renta_mensual = $datos['renta_mensual'] ?? 0;
    $trabajando = $datos['trabajando'] ?? '';
    $anos_experiencia = $datos['anos_experiencia'] ?? 0;

    try {
        // Iniciar transacción
        $mysql->begin_transaction();

        // Preparar la consulta SQL
        $stmt = $mysql->prepare("INSERT INTO fichas (rut, nombre, apellido, genero, altura, fecha_naci, telefono, email, edad, direccion, comuna, educacion_basica, educacion_media, renta_mensual, trabajando, anos_experiencia) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        // Verificar si la preparación fue exitosa
        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta: " . $mysql->error);
        }

        // Vincular los parámetros
        $stmt->bind_param("ssssdsisissiidis", 
            $rut, $nombre, $apellido, $genero, $altura, $fecha_nacimiento, $telefono, $email, $edad, 
            $direccion, $comuna, $educacion_basica, $educacion_media, $renta_mensual, $trabajando, $anos_experiencia
        );

        // Ejecutar la consulta
        if (!$stmt->execute()) {
            throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
        }

        // Confirmar la transacción
        $mysql->commit();

        $res = [
            'status' => 'success',
            'message' => '¡Ficha creada con éxito!'
        ];

    } catch (Exception $e) {
        // En caso de error, hacer rollback
        $mysql->rollback();

        $res = [
            'status' => 'error',
            'message' => '¡Lo Sentimos! Ha ocurrido un error al guardar la ficha. Por favor, inténtelo de nuevo.'
        ];
    }

    // Cerrar la declaración y la conexión
    if ($stmt) {
        $stmt->close();
    }

    $mysql->close();

    // Devolver el resultado como JSON
    echo json_encode($res);
}
?>