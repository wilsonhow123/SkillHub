<?php 
include("database.php");

if ($_SERVER['REQUEST_METHOD'] == "GET" && isset($_GET["action"])) {
  session_start();
  $id = mysqli_real_escape_string($con, $_GET['courseId']);
  $query = null;
  switch ($_GET["action"]) {
    case "getCourse":
      // $id = 20;

      // $query = "SELECT * FROM course  WHERE Course_ID = {$id}";
      $query = "SELECT * 
                FROM course 
                INNER JOIN published_course ON course.Course_ID = published_course.Course_ID 
                INNER JOIN user ON published_course.User_ID = user.User_ID 
                WHERE course.Course_ID = $id";
      // $query .= "SELECT COUNT(*) as quizCount FROM exercise INNER JOIN course ON exercise.Course_ID = course.Course_ID WHERE exercise.Course_ID = {$id};";
      // $query .= "SELECT COUNT(*) as resourceCount, Resource_Name FROM course INNER JOIN resource ON course.Course_ID = resource.Course_ID WHERE course.Course_ID = {$id}";
      // if (mysqli_multi_query($con, $query)) {
      //   $results = array();
      //   do {
      //     if ($result = mysqli_store_result($con)) {
      //       $data = mysqli_fetch_assoc($result);
      //       $results[] = $data;
      //       mysqli_free_result($result);
      //     }
      //   }
      //   while (mysqli_next_result($con));

      //   echo json_encode($results);
        
      // } else {
      //   echo "No results.";
      // }
      $result = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
      $data = array();
    
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }
      echo json_encode($data);
      break;

    case "getCourseResource":
      $query = "SELECT Resource_Name, File_Path, Chapter 
                FROM resource 
                INNER JOIN course ON resource.Course_ID = course.Course_ID 
                WHERE course.Course_ID = $id 
                ORDER BY Chapter ASC";
      $result = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
      $data = array();
    
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }
      echo json_encode($data);
      break;

    case "getQuizResource":
      $query = "SELECT Exercise_ID, Exercise_Name, Chapter 
                FROM exercise 
                INNER JOIN course ON exercise.Course_ID = course.Course_ID 
                WHERE course.Course_ID = $id 
                ORDER BY Chapter ASC";
      $result = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
      $data = array();
    
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }
      echo json_encode($data);
      break;
    
    case "getReview":
      $query = "SELECT Review_Date, Comment, Name
                FROM Review
                INNER JOIN User ON Review.User_ID = User.User_ID
                WHERE Course_ID = $id
                ORDER BY Review_Date, Review_ID DESC
                LIMIT 0, 100";
      $result = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
      $data = array();
    
      while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
      }
      echo json_encode($data);
      break;

    case "addReview":
      $user_id = $_SESSION["user_info"]["User_ID"];
      $comment = mysqli_real_escape_string($con, $_GET["comment"]);
      $date = date("Y-m-d");
      $query = "INSERT INTO Review(Review_ID, Review_Date, Comment, User_ID, Course_ID)
                VALUES (NULL, '$date', '$comment', $user_id, $id)";
      $result = mysqli_query($con, $query) or die("Query error:".mysqli_error($con));
      break;
  }
  mysqli_close($con);
  session_write_close();
}
?>
