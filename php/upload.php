<?php
    // create an unique number for file name to prevent same file path in server storage
    $unique_num = uniqid($file_name);
    $path = "./".$folder."/".$unique_num.".".$file_type;
    // move the file into server storage based on path
    move_uploaded_file($file_tmp_name, ".".$path);
    $path = mysqli_real_escape_string($con, $path);
?>