<?php
    $action = $_GET['action'];

    if($action == 'crear'){
        include './fichas/grabar.php';
        echo crear($_POST);
    }
    if($action == 'editar'){
        require_once('./fichas/editar.php');
        echo editar($_POST);
    }
    if($action == 'eliminar'){
        require_once('./fichas/eliminar.php');
        echo eliminar($_POST);
    }
    if($action == 'listar'){
        require_once('./fichas/listar.php');
        echo listar($_POST);
    }
?>