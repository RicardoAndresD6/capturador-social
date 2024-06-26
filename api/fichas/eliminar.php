<?php

require_once __DIR__ . '/../config.php';

/**
 * Función para eliminar una ficha por su id
 * @Param array $id
 * @Return JSON
 */
function eliminar($data){

    $id = $data['id'];

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

    $query = "DELETE FROM fichas WHERE id = ?";

    if ($stmt = $db_connection->prepare($query)) {

        // Vincular el parámetro
        $stmt->bind_param("i", $id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Verificar cuántas filas fueron afectadas
            if ($stmt->affected_rows > 0) {
                $res = [
                    "status" => "success",
                    "message" => "¡Ficha eliminada con éxito!"
                ];
            } else {
                $res = [
                    "status" => "error",
                    "message" => "No se encontró ninguna ficha con el id proporcionado."
                ];
            }
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

    echo json_encode($res);
}
?>