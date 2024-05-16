<?php
//Obtenemos los datos de los input

function listar($datos){
    var_dump($datos);
    die();
    $nombre = mysql_real_escape_string($_POST["nombre"]);
    $apellido = mysql_real_escape_string($_POST["apellido"]);
    $edad = mysql_real_escape_string($_POST["edad"]);

    $nombre = "nombre";
    $apellido = "apellido";
    $edad = 20;

    $username = "root";
    $password = "12345678";
    $database = "fichas";

    $mysqli = new mysqli("localhost", $username, $password, $database);

    $query = "INSERT INTO fichas (nombre, apellido, edad)
                VALUES ('{$nombre}','{$apellido}','{$edad}}')";

    $mysqli->query($query);
    $mysqli->close();

    //Hacemos las comprobaciones que sean necesarias... (sanitizar los textos para evitar XSS e inyecciones de código, comprobar que la edad sea un número, etc.)
    //Omitido para la brevededad del código
    //PERO NO OLVIDES QUE ES ALGO IMPORTANTE.

    //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
    header('Content-Type: application/json');
    //Guardamos los datos en un array

    $datos = array(
    'estado' => 'ok'
    );
    //Devolvemos el array pasado a JSON como objeto
    echo json_encode($datos, JSON_FORCE_OBJECT);
}
?>