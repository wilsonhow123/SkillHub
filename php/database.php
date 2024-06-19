<?php
    $server = "localhost";
    $user = "root";
    $password = "";
    $database_name = "skillhub";
    $con = mysqli_connect($server, $user, $password, $database_name) or die("Connection error:". mysqli_connect_error());
?>