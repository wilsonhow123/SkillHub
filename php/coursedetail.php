<?php
    if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["action"])) {
        session_start();
        include("database.php");

        switch ($_GET["action"]) {
            case "get course detail":
                $courseId = $_GET["courseId"];
                $courseInfo = array();
                $query1 = "SELECT C.Course_ID, C.Course_Name, C.Description, C.Duration, C.Total_Participator, C.Image_Name, C.Image_Path, PC.Published_Date, U.Name, COUNT(R.Course_ID) AS Lesson
                        FROM Course C
                        INNER JOIN Published_Course PC ON C.Course_ID = PC.Course_ID 
                        INNER JOIN User U ON PC.User_ID = U.User_ID
                        INNER JOIN resource R ON C.Course_ID = R.Course_ID
                        WHERE C.Course_ID = $courseId
                        ";
                $run_query1 = mysqli_query($con, $query1) or die("Query Error:".mysqli_query_error($con));
                $result = mysqli_fetch_assoc($run_query1);

                if (isset($_SESSION["user_info"])) {
                    $userId = $_SESSION["user_info"]["User_ID"];
                    $query2 = "SELECT * 
                                FROM Enrolled_Course
                                WHERE User_ID = $userId AND Course_ID = $courseId";
                    $run_query2 = mysqli_query($con, $query2) or die("Query Error:".mysqli_query_error($con));
                    $result["enrolled"] = mysqli_num_rows($run_query2);

                    $query3 = "SELECT * 
                                FROM Published_Course
                                WHERE User_ID = $userId AND Course_ID = $courseId";
                    $run_query3 = mysqli_query($con, $query3) or die("Query Error:".mysqli_query_error($con));                                
                    $result["publisher"] = mysqli_num_rows($run_query3);
                }
                print_r(json_encode($result));
                break;

            case "enroll course":
                if (isset($_SESSION["user_info"])) {
                    $userId = $_SESSION["user_info"]["User_ID"];
                    $courseId = $_GET["courseId"];
                    $date = date("Y-m-d");
                    $query4 = "INSERT Enrolled_Course(Course_ID, User_ID, Enrolled_Date)
                                VALUES($courseId, $userId, '$date')";
                    $run_query4 = mysqli_query($con, $query4) or die("Query Error:".mysqli_query_error($con));
                    $query5 = "UPDATE Course SET Total_Participator = Total_Participator + 1 WHERE Course_ID = $courseId";
                    $run_query5 = mysqli_query($con, $query5) or die("Query Error:".mysqli_query_error($con));
                    $check = "enrol course number";
                    include_once("badge_check.php");
                    echo "enroll course success";
                } 
                break;

            case "delete course":
                $courseId = $_GET["courseId"];
                $query6 = "SELECT Image_Path FROM Course WHERE Course_ID = $courseId";
                $run_query6 = mysqli_query($con, $query6) or die("Query Error:".mysqli_query_error($con));
                $path = mysqli_fetch_assoc($run_query6)["Image_Path"];
                unlink(".$path");

                $delete_query1 = "DELETE FROM Question WHERE Exercise_ID IN (SELECT Exercise_ID FROM Exercise WHERE Course_ID = $courseId)";
                $delete_query2 = "DELETE FROM Exercise WHERE Course_ID = $courseId";
                $delete_query3 = "DELETE FROM Resource WHERE Course_ID = $courseId";
                $delete_query4 = "DELETE FROM Enrolled_Course WHERE Course_ID = $courseId";
                $delete_query5 = "DELETE FROM Published_Course WHERE Course_ID = $courseId";
                $delete_query6 = "DELETE FROM REVIEW WHERE Course_ID = $courseId";
                $delete_query7 = "DELETE FROM Course WHERE Course_ID = $courseId";
                foreach([$delete_query1, $delete_query2, $delete_query3, $delete_query4, $delete_query5, $delete_query6, $delete_query7] as $delete_query) {
                    $run_delete_query = mysqli_query($con, $delete_query) or die("Query Error:".mysqli_query_error($con));
                }
                echo "delete course success";
                break;
        }
        session_write_close();
        mysqli_close($con);
    }
?>