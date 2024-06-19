<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"])) {
    session_start();
    include "database.php";
    switch ($_POST["action"]) {
        case "getRequest":
            $request_array = array();
            $get_request = "SELECT * FROM Teach_Request";
            $run_get_request = mysqli_query($con, $get_request) or die("Query error:".mysqli_error($con));
            while ($row = mysqli_fetch_assoc($run_get_request)) {
                $request_array[$row["Request_ID"]] = $row; 
            }
            print_r(json_encode($request_array));
            break;
        case "updateStatus":
            $status = $_POST["status"];
            $id = $_POST["id"];
            $update_request = "UPDATE Teach_Request SET Request_Status = '$status' WHERE Request_ID = $id";
            $run_update_request = mysqli_query($con, $update_request) or die("Query error:".mysqli_error($con));
            if ($status == "Approve") {
                $role = "Teacher";
            }
            else {
                $role = "Student";
            }
            $update_teach_status = "UPDATE User SET Role = '$role' WHERE User_ID = (SELECT User_ID FROM Teach_Request WHERE  Request_ID = $id)";
            $run_update_teach_status = mysqli_query($con, $update_teach_status) or die("Query error:".mysqli_error($con));
            break;
        case "apply":
            if (isset($_SESSION['user_info'])) {
                $id = $_SESSION['user_info']["User_ID"];
                $date = date("Y-m-d");
                $interested_area = mysqli_real_escape_string($con, $_POST["interested-area"]);
                $backgrounds = mysqli_real_escape_string($con, $_POST["backgrounds"]);
                $reason = mysqli_real_escape_string($con, $_POST["reason"]);
                $insert_request = "INSERT INTO 
                                    Teach_Request(Request_ID, Request_Date, Interested_Area, Reason, Background, Request_Status, User_ID)
                                    VALUES (NULL, '$date', '$interested_area', '$reason', '$backgrounds', 'PENDING', $id)
                                    ";
                $run_insert_request = mysqli_query($con, $insert_request) or die("Query error:".mysqli_error($con));
                echo "apply success";
            }
            break;
    }
    session_write_close();
    mysqli_close($con);
}
?>