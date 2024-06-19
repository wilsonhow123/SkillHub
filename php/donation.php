<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"])) {
        session_start();
        include("database.php");
        if ($_POST["action"] == "add donation") {
            $user_id = $_SESSION["user_info"]["User_ID"];
            $amount = $_POST["amount"];
            $receipt = $_FILES["receipt"];
            $file_name = mysqli_real_escape_string($con, explode(".", $receipt["name"])[0]);
            $file_type = explode(".", $receipt["name"])[1];
            $file_tmp_name = $receipt["tmp_name"];
            $folder = "donation_receipt";
            include("upload.php");
            $date = date("Y-m-d");
            $query = "INSERT INTO Donation (Donation_ID, Donation_Amount, Donation_Date, Receipt_Name, Receipt_Path, User_ID)
                      VALUES (NULL, $amount, '$date', '$file_name', '$path', $user_id)";
            $run_query = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
        }
        mysqli_close($con);
        session_write_close();
    }
?>