<?php
    $user_id = $_SESSION['user_info']['User_ID'];
    $achieved_date = date("Y-m-d");
    switch ($check) {
        case "registered duration":
            // Retrieve user registration date
            $retrieve_date = "SELECT Register_date FROM User WHERE User_ID = $user_id";
            $date_result = mysqli_query($con, $retrieve_date) or die("Query error:".mysqli_error($con));
            $date_row = mysqli_fetch_assoc($date_result);
            $register_date = $date_row['Register_date'];

            // Check if the user has been registered for at least a year
            if (strtotime($register_date) < strtotime('-1 year')) {
                $badge_check_query = "SELECT * FROM achieved_badges WHERE User_ID = $user_id AND Badge_Type = '1 Year User'";
                $badge_result = mysqli_query($con, $badge_check_query) or die("Query error:".mysqli_error($con));

                // Check if the user already has the badge
                if (mysqli_num_rows($badge_result) == 0) {
                    $One_Year = "./img/badges/OneYear.png";
                    // Insert the badge into the achieved_badges table
                    $insert_badge_query = "INSERT INTO achieved_badges (Badge_ID, Badge_Type, Badge_Description, Date_Achieved, Badge_Image, User_ID) VALUES (NULL, '1 Year User', 'You have been a user for a year!', '$achieved_date','$One_Year', $user_id)";
                    $badge_insert_result = mysqli_query($con, $insert_badge_query) or die("Query error:".mysqli_error($con));
                    echo ". Congratulation You have registered as 1 year user";
                }
            }
            break;

        case "enrol course number":
            $enrolled_courses = "SELECT * FROM enrolled_course WHERE User_ID = $user_id";
            $enrolled_courses_result = mysqli_query($con, $enrolled_courses) or die("Query error:".mysqli_error($con));
            $enrolled_course_number = mysqli_num_rows($enrolled_courses_result);
            if ($enrolled_course_number >= 10 && $enrolled_course_number <= 19) {
                $Ten_Course = './img/badges/TenCourse.png';
                $course_badge_check = "SELECT * FROM achieved_badges WHERE User_ID = $user_id AND Badge_Type = '10 Courses Enrolled'";
                $course_badge_result = mysqli_query($con, $course_badge_check) or die("Query error:".mysqli_error($con));
                if (mysqli_num_rows($course_badge_result) == 0) {
                    $insert_course_badge_query = "INSERT INTO achieved_badges (Badge_ID, Badge_Type, Badge_Description, Date_Achieved, Badge_Image, User_ID) VALUES (NULL, '10 Courses Enrolled', 'You have enrolled into 10 courses!', '$achieved_date', '$Ten_Course', $user_id)";
                    $badge_insert_result = mysqli_query($con, $insert_course_badge_query) or die("Query error:".mysqli_error($con));
                    echo "10 courses";
                }
            }
            else if ($enrolled_course_number >= 20) {
                $Twenty_Course = './img/badges/TwentyCourse.png';
                $course_badge_check = "SELECT * FROM achieved_badges WHERE User_ID = $user_id AND Badge_Type = '20 Courses Enrolled'";
                $course_badge_result = mysqli_query($con, $course_badge_check) or die("Query error:".mysqli_error($con));
                if (mysqli_num_rows($course_badge_result) == 0) {
                    $insert_course_badge_query = "INSERT INTO achieved_badges (Badge_ID, Badge_Type, Badge_Description, Date_Achieved, Badge_Image, User_ID) VALUES (NULL, '20 Courses Enrolled', 'You have enrolled into 20 courses!', '$achieved_date', '$Twenty_Course', $user_id)";
                    $badge_insert_result = mysqli_query($con, $insert_course_badge_query) or die("Query error:".mysqli_error($con));
                    echo "20 courses";
                }
            }
            break;
    }
?>
