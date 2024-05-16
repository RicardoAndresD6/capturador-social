<?php

require_once __DIR__ . '/../config.php';

/**
 * Función para listar la lista de fichas todas las fichas
 * @Return JSON
 */
function listar_todos(){

    // Configuración de la base de datos
    global $servername, $username, $password, $database;
    
    $res = [];

    // Conexión a la base de datos
    $db_connection= new mysqli($servername, $username, $password, $database);

    // Verificar si la conexión fue exitosa
    if ($db_connection->connect_error) {
        die("Conexión fallida: " . $db_connection->connect_error);
    }

    $query = "SELECT * FROM fichas";

    // Preparar la consulta
    if ($stmt = $db_connection->prepare($query)) {

        $stmt->execute();

        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $res[] = $row;
        }

        // Cerrar el statement
        $stmt->close();

    } else {
        // Manejo del error en la preparación de la consulta
        echo "Error en la preparación de la consulta: " . $db_connection->error;
    }

    // Cerrar la conexión
    $db_connection->close();

    // Devolver los datos en formato JSON
    echo json_encode($res);

}
?>