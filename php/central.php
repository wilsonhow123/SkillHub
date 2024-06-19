<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["identification"])) {
            if (isset($_SESSION['user_info'])) {
                print_r(json_encode($_SESSION["user_info"]));
            }
        }
        else if (isset($_POST["logOut"])) {
            unset($_SESSION["user_info"]);
        }
    }
    session_write_close();
?>