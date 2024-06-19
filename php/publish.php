<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"])) {
        session_start();
        include("database.php");

        switch ($_POST['action']) {
            // js request retrieve category and difficulty data
            case "get category":

                // select category data from category table and insert the data into category_array array and insert the array into catergory_difficulty_array array
                $select_category_query = "SELECT * FROM Category";
                $run_select_category_query = mysqli_query($con, $select_category_query) or die("Query Error: ".mysqli_error($con));
                $category_array = array();
                while ($category_data = mysqli_fetch_assoc($run_select_category_query)) {
                    $category_array[$category_data["Category_ID"]] = $category_data["Category_Name"];
                }

                // after retrieving all category and difficulty data return the data in json form to js
                print_r(json_encode($category_array));
                break;

            // js request to record all input into database
            case "insert course":
                // if user session still got
                if (isset($_SESSION["user_info"])) {
                    $title = mysqli_real_escape_string($con, $_POST["title"]);
                    $description = mysqli_real_escape_string($con, $_POST["description"]);
                    $category = mysqli_real_escape_string($con, $_POST["category"]);
                    $duration = mysqli_real_escape_string($con, $_POST["duration"]);
                    // get cover image file from POST and move the file into server storage
                    $image = $_FILES["imagefile"];
                    $file_name = explode(".", $image["name"])[0];
                    $file_type = explode(".", $image["name"])[1];
                    $file_tmp_name = $image["tmp_name"];
                    $folder = "cover_img";
                    include("upload.php");
                    $file_name = mysqli_real_escape_string($con, $file_name);
                    $path = mysqli_real_escape_string($con, $path);
                    // insert course data into course table
                    $insert_course_query = "INSERT INTO Course(Course_ID, Course_Name, Description, Duration, Total_Participator, Image_Name, Image_Path, Category_ID) VALUES (NULL, '$title', '$description', '$duration', 0, '$file_name', '$path', $category)";
                    $run_insert_course_query = mysqli_query($con, $insert_course_query) or die("Query Error: ".mysqli_error($con));
                    $last_course_id = mysqli_insert_id($con); // get the inserted course id
    
                    // insert user id, course id and published date into published course table
                    $user_info = $_SESSION["user_info"];
                    $user_id = $user_info["User_ID"];
                    $date = date("Y-m-d");
                    $insert_published_course_query = "INSERT INTO Published_Course(Course_ID, User_ID, Published_Date)  VALUES($last_course_id, '$user_id', '$date')";
                    $run_insert_published_course_query = mysqli_query($con, $insert_published_course_query) or die("Query Error: ".mysqli_error($con));
    
                    // insert resource into database
                    $resource_file_number = count($_FILES) - 1;
                    $folder = "resource";
                    for ($chapter_num = 1; $chapter_num <= $resource_file_number; $chapter_num++) {
                        $post_name = "resource".$chapter_num."file";
                        $resource = $_FILES[$post_name];
                        $file_name = explode(".", $resource["name"])[0];
                        $file_type = explode(".", $resource["name"])[1];
                        $file_size = $resource["size"];
                        $file_tmp_name = $resource["tmp_name"];
                        include("upload.php");
                        $file_name = mysqli_real_escape_string($con, $file_name);
                        $file_type = mysqli_real_escape_string($con, $file_type);
                        $file_size = mysqli_real_escape_string($con, $file_size);
                        $path = mysqli_real_escape_string($con, $path);
                        $insert_resource_query = "INSERT INTO Resource(Resource_ID, Resource_Name, File_Type, File_Size, File_Path, Chapter, Course_ID) VALUES(NULL, '$file_name', '$file_type', $file_size, '$path', $chapter_num, $last_course_id)";
                        $run_insert_resource_query = mysqli_query($con, $insert_resource_query) or die("Query Error: ".mysqli_error($con));
                    }
    
                    // Insert exercise and question into database
                    $exercise_json = $_POST["exercise"];
                    $exercise_array = json_decode($exercise_json); // json file trasferred from js should be decode in php for next processing
    
                    // process exercise from chapter 1 until chapter n
                    foreach($exercise_array as $chapter_num => $exercise) {
                        $exercise_name = mysqli_real_escape_string($con, $exercise[0]);
                        $total_question_num = count($exercise[1]);
                        $insert_exercise_query = "INSERT INTO Exercise(Exercise_ID, Exercise_Name, Chapter, Total_Question_Number, Course_ID) VALUES (NULL, '$exercise_name', $chapter_num, $total_question_num, $last_course_id)";
                        $run_insert_exercise_query = mysqli_query($con, $insert_exercise_query) or die("Query Error: ".mysqli_error($con));
                        $last_exercise_id = mysqli_insert_id($con); // get inserted exercise id
    
                        // process question from question 1 until question n of this exercise
                        foreach($exercise[1] as $index => $question) {
                            // $index is start from 0 but question number is start from 1 so plus 1
                            $question_num = mysqli_real_escape_string($con, $index + 1);
                            $question_description = mysqli_real_escape_string($con, $question);
    
                            $answers_description = $exercise[2][$index];
                            $answer_description_A = mysqli_real_escape_string($con, $answers_description[0]);
                            $answer_description_B = mysqli_real_escape_string($con, $answers_description[1]);
                            $answer_description_C = mysqli_real_escape_string($con, $answers_description[2]);
                            $answer_description_D = mysqli_real_escape_string($con, $answers_description[3]);
    
                            $answer = mysqli_real_escape_string($con, $exercise[3][$index]);
    
                            $insert_question_query = "INSERT INTO Question(Question_No, Exercise_ID, Description, OptionA, OptionB, OptionC, OptionD, Answer) VALUES ('$question_num', '$last_exercise_id', '$question_description', '$answer_description_A', '$answer_description_B', '$answer_description_C', '$answer_description_D', '$answer')";
                            $run_insert_question_query = mysqli_query($con, $insert_question_query) or die("Query Error: ".mysqli_error($con));
                        }
                    }
                    echo "Course Published";
                }
                else {
                    echo "You session have been expired";
                }
                break;
        }
        mysqli_close($con);
        session_write_close();
    }
?>