<?php
    session_start();
    include("database.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['user_info'])) {

        // update profile
        if ($_SERVER['CONTENT_TYPE'] == 'application/json') {
            // get json file
            $json = file_get_contents("php://input");
            // decode json
            $userInfo = json_decode($json, true);
            // retrieve data from json
            $id = $userInfo["User_ID"];
            $name = $userInfo["Name"];
            $dob = $userInfo["DOB"];
            $gender = $userInfo["Gender"];
            $country = $userInfo["Country"];
            $email = $userInfo["Email"];
            // if the new email is not same as old email then check email avaibility
            if ($email != $_SESSION['user_info']["Email"]) {
                $select_query = "SELECT * FROM User WHERE Email = '$email'";
                $run_select_query = mysqli_query($con, $select_query) or die("Query error:".mysqli_error($con));
                // if email already in the database
                if (mysqli_num_rows($run_select_query) > 0) {
                    echo "fail";
                    exit();
                }
            }
            $update_query = "UPDATE User SET Name = '$name', DOB = '$dob', Gender = '$gender', Country = '$country', Email = '$email' WHERE User_ID = $id";
            $run_update_query = mysqli_query($con, $update_query) or die("Query error:".mysqli_error($con));
            $_SESSION['user_info'] = $userInfo;
            echo "success";
        }
        if (isset($_POST["action"])) {
            if ($_POST["action"] == "reset password") {
                $new_password = mysqli_real_escape_string($con, $_POST["newPassword"]);
                $password_encrypted = password_hash($new_password, PASSWORD_DEFAULT);
                $_SESSION["Password"] = $password_encrypted;
                $id = $_SESSION["user_info"]["User_ID"];
                $update_password = "UPDATE User SET Password = '$password_encrypted' WHERE User_ID = $id";
                $run_update_password = mysqli_query($con, $update_password) or die("Query error:".mysqli_error($con));
                echo "reset password success";
            }
        }
    }

    else if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["action"]) && $_GET["action"] === "getBadges" && isset($_SESSION['user_info'])) {
        $id = $_SESSION["user_info"]["User_ID"];
        $badge_array = array();
        $badge_query = "SELECT * FROM achieved_badges WHERE User_ID = $id";
        $badge_query_result = mysqli_query($con, $badge_query) or die("Query error:".mysqli_error($con));

        while ($individual_badge = mysqli_fetch_assoc($badge_query_result)) {
            $badge_array[] = $individual_badge;
        }

        print_r(json_encode($badge_array));
    }

    else if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["action"]) && isset($_SESSION['user_info'])) {

        $course_array = array();
        $id = $_SESSION["user_info"]["User_ID"];

        switch ($_GET["action"]) {
            case "all-courses":
                $select_course = 
                "SELECT C.Course_ID, C.Course_Name, C.Duration, C.Total_Participator, C.Image_Name, C.Image_Path, U.Name
                    FROM Course C 
                    INNER JOIN Published_Course PC ON C.Course_ID = PC.Course_ID 
                    INNER JOIN Enrolled_Course EC ON C.Course_ID = EC.Course_ID 
                    INNER JOIN User U ON PC.User_ID = U.User_ID
                    WHERE EC.User_ID = $id
                ";
                break;

            case "published-courses":
                $select_course = 
                "SELECT C.Course_ID, C.Course_Name, C.Duration, C.Total_Participator, C.Image_Name, C.Image_Path, U.Name
                    FROM Course C 
                    INNER JOIN Published_Course PC ON C.Course_ID = PC.Course_ID
                    INNER JOIN User U ON PC.User_ID = U.User_ID
                    WHERE PC.User_ID = $id
                ";
                break;
            
        }
        $run_select_course = mysqli_query($con, $select_course) or die("Query error:".mysqli_error($con));
        while ($course = mysqli_fetch_assoc($run_select_course)) {
            $course_array[$course["Course_ID"]] = $course;
        }
        print_r(json_encode($course_array));
        
    }
    else {
        echo "expired";
    }
    mysqli_close($con);
    session_write_close();
    
?>