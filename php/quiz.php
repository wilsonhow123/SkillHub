<?php
include("database.php");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if(isset($_GET['exercise_id'])) {
    $id = $_GET['exercise_id'];

    $query = "SELECT * FROM question 
              INNER JOIN exercise ON question.Exercise_ID = exercise.Exercise_ID
              WHERE question.Exercise_ID = {$id} 
              ORDER BY question.Question_No";
    $result = mysqli_query($con, $query);
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
      $data[] = $row;
    }
    print_r(json_encode($data));
  }
}
?>