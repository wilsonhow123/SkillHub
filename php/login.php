<?php
    session_start();
    // if get post request from client side
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // connect database
        include("database.php");

        switch ($_POST["action"]) {
            // for signin
            case "login":
                // get user's email and password and use mysqli_real_escape_string to prevent sql injection
                $email = mysqli_real_escape_string($con, $_POST['email']);
                $password = mysqli_real_escape_string($con, $_POST['password']);
                
                // Create select user info query which email is same as the input and apply the query to the database
                $get_user = "SELECT * FROM User WHERE Email='$email'";
                $user_query = mysqli_query($con, $get_user) or die("Query error:".mysqli_error($con));
                
                // if the email is exist in database
                if (mysqli_num_rows($user_query) > 0) {
                    $user_info = mysqli_fetch_assoc($user_query);
                    // verify the password is weather matched to the account password
                    $verify_status = password_verify($password, $user_info['Password']);
                    // email and password correct
                    if ($verify_status) {
                        // set cookie to store user info which exist 24 hours
                        $_SESSION['user_info'] = $user_info;
                        $check = "registered duration";
                        echo "Login Success";
                        include_once("badge_check.php");
                    }
                    else {
                        echo "Login Fail";
                    }
                }
                else {
                    // wrong password or email then return messegas to client
                    echo "Login Fail";
                }
                break;

            case "register":
                $email = mysqli_real_escape_string($con, $_POST['email']);

                // select user data which email is the email input
                $get_user_email = "SELECT * FROM User WHERE Email='$email'";
                $user_query = mysqli_query($con, $get_user_email) or die("Query Error:".mysqli_query_error($con));
                // if email is already in database means that the email has been registered
                if (mysqli_num_rows($user_query) > 0) {
                    echo "Email Already Exist";
                }
                else {
                    echo "Register Success";
                }
                break;

            // for registration
            case "create account":
                $email = mysqli_real_escape_string($con, $_POST['email']);
                $password = mysqli_real_escape_string($con, $_POST['password']);
                $name = mysqli_real_escape_string($con, $_POST['name']);
                $birth = mysqli_real_escape_string($con, $_POST['birth']);
                $gender = mysqli_real_escape_string($con, $_POST['gender']);
                $country = mysqli_real_escape_string($con, $_POST['country']);
                // encrypt password
                $password_encrypted = password_hash($password, PASSWORD_DEFAULT);
                $date = date("Y-m-d");

                // insert user data into database
                $insertdata = "INSERT INTO User(User_ID, Name, DOB, Gender, Country, Email, Password, Role, Register_Date) VALUES(NULL, '$name', '$birth', '$gender', '$country', '$email', '$password_encrypted', 'Student', '$date')";
                $query2 = mysqli_query($con, $insertdata) or die("Query Error:".mysqli_query_error($con));
                // redirect to sign in page with sending messages
                echo "Account Created";
                break;
    }
    session_write_close();
    mysqli_close($con);
    exit();
}
?>
                    