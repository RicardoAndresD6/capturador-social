<?php

require_once __DIR__ . '/../config.php';

/**
 * Función para eliminar todos los registros de las fichas
 * @Return JSON
 */
function eliminar_todos(){

    // Configuración de la base de datos
    global $servername, $username, $password, $database;

    $res = [];

    // Conexión a la base de datos
    $db_connection = new mysqli($servername, $username, $password, $database);

    // Verificar si la conexión fue exitosa
    if ($db_connection->connect_error) {
        $res = [
            "status" => "error",
            "message" => "Conexión fallida: " . $db_connection->connect_error
        ];
    }

    // Consulta para eliminar todos los registros de la tabla fichas
    $query = "DELETE FROM fichas";

    // Preparar la consulta
    if ($stmt = $db_connection->prepare($query)) {

        // Ejecutar la consulta
        if ($stmt->execute()) {
            $res = [
                "status" => "success",
                "message" => "¡Todas las fichas han sido eliminadas con éxito!"
            ];
        } else {
            $res = [
                "status" => "error",
                "message" => "Error en la ejecución de la consulta: " . $stmt->error
            ];
        }

        // Cerrar el statement
        $stmt->close();

    } else {
        $res = [
            "status" => "error",
            "message" => "Error en la preparación de la consulta: " . $db_connection->error
        ];
    }

    // Cerrar la conexión
    $db_connection->close();

    // Devolver la respuesta en formato JSON
    echo json_encode($res);
}
?>