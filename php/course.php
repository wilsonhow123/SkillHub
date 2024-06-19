<?php
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        include("database.php");
        if (isset($_GET["action"])) {
            $name = mysqli_real_escape_string($con, $_GET["nameChoice"]);
            $duration = $_GET["durationChoice"];
            $category = $_GET["categoryChoice"];
            $name_query = NULL;
            $category_query = NULL;
            $duration_query = NULL;
            $filter_query = NULL;

            if ($name != "null") {

                $name_query = "(C.Course_ID = '$name' OR Course_Name LIKE '%$name%' OR U.Name LIKE'%$name%')";
            }

            $category_id = preg_replace("/[^0-9]/", "", $category);
            if ($category_id) {
                $category_query = "Category_ID = $category_id";
            }

            if ($duration == "duration1") {
                $duration_query = "Duration < 60";
            }
            else if ($duration == "duration2") {
                $duration_query = "Duration BETWEEN 60 AND 180";
            }
            else if ($duration == "duration3") {
                $duration_query = "Duration > 180";
            }

            if ($name_query || $category_query || $duration_query) {
                $filter_query = "WHERE ";
                $queries = array_filter([$name_query, $category_query, $duration_query]); // Remove empty queries
                $filter_query .= implode(" AND ", $queries);
            }

            switch ($_GET["action"]) {
                case "getCourse":
                    $page = $_GET["page"];

                    $first_row = ($page-1)*9;
                    
                    $course_array = array();
                    $query = "SELECT C.Course_ID, C.Course_Name, C.Duration, C.Total_Participator, C.Image_Name, C.Image_Path, U.Name
                            FROM Course C
                            INNER JOIN Published_Course PC ON C.Course_ID = PC.Course_ID 
                            INNER JOIN User U ON PC.User_ID = U.User_ID
                            $filter_query
                            ORDER BY PC.Published_Date DESC
                            LIMIT $first_row, 9
                            ";
                    $run_query = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
                    while ($course = mysqli_fetch_assoc($run_query)) {
                        $course_array[$course["Course_ID"]] = $course;
                    }
                    print_r(json_encode($course_array));
                    break;

                case "getMaxPage":
                    $query = "SELECT * FROM Course $filter_query";
                    $run_query = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
                    echo mysqli_num_rows($run_query);
                    break;
            }
        }
        mysqli_close($con);
    }
?>