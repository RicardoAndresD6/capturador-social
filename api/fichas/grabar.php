<?php

require_once __DIR__ . '/../config.php';

/**
 * Función para crear una ficha
 * @Param array $datos
 * @Return JSON
 */
function crear($datos){

    // Configuración de la base de datos
    global $servername, $username, $password, $database;
    
    $res = [];

    // Conexión a la base de datos
    $db_connection = new mysqli($servername, $username, $password, $database);

    // Verificar la conexión
    if ($db_connection->connect_errno) {
        throw new Exception("Falló la conexión a MySQL: " . $db_connection->connect_error);
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
        $db_connection->begin_transaction();

        // Preparar la consulta SQL
        $stmt = $db_connection->prepare("INSERT INTO fichas (rut, nombre, apellido, genero, altura, fecha_naci, telefono, email, edad, direccion, comuna, educacion_basica, educacion_media, renta_mensual, trabajando, anos_experiencia) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta: " . $db_connection->error);
        }

        // Vincular los parámetros
        $stmt->bind_param("ssssdsssissiiisi", 
            $rut, $nombre, $apellido, $genero, $altura, $fecha_nacimiento, $telefono, $email, $edad, 
            $direccion, $comuna, $educacion_basica, $educacion_media, $renta_mensual, $trabajando, $anos_experiencia
        );

        // Ejecutar la consulta
        if (!$stmt->execute()) {
            throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
        }

        $db_connection->commit();

        $res = [
            'status' => 'success',
            'message' => '¡Ficha creada con éxito!'
        ];

    } catch (Exception $e) {
        // En caso de error, hacer rollback
        $db_connection->rollback();

        $res = [
            'status' => 'error',
            'message' => '¡Lo Sentimos! Ha ocurrido un error al guardar la ficha. Por favor, inténtelo de nuevo.'
        ];
    }

    // Cerrar la declaración y la conexión
    if ($stmt) {
        $stmt->close();
    }

    $db_connection->close();

    // Devolver el resultado como JSON
    echo json_encode($res);
}
?>