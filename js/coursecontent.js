// const url = window.location.href
const url = window.location.search; //to test
const searchParams = new URLSearchParams(url);
const id = searchParams.get('courseId');
const reviewBox = document.querySelector(".review-box");
const reviewInput = document.querySelector(".review-input");
const reviewMessage = document.querySelector(".review-message");

document.addEventListener("DOMContentLoaded", () => {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `php/coursecontent.php?action=getCourse&courseId=${id}`);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText)[0];
      if (response) {
        // changing the contents based on response data
        const title = document.querySelector(".container").querySelector("h1");
        title.innerHTML = response.Course_Name;

        const imgContainer = document.querySelector(".main-img");
        imgContainer.src = response.Image_Path.replace("\\", "");

        const tutor = document.querySelector(".teacher-name").querySelector("p");
        const tutorEmail = document.querySelector(".teacher-name").querySelector("span");
        tutor.innerHTML = response.Name;
        tutorEmail.innerHTML = response.Email;

        const aboutCourse = document.querySelector(".about-container").querySelector("p");
        aboutCourse.innerHTML = response.Description

        renderQuiz()
        renderResource()
      }
      else {
        alert("Invalid Course. Returning to all course page");
        window.location.href = "course.html";
      }
    }
  }
})

function renderQuiz() {
  const xhr = new XMLHttpRequest;
  xhr.open("GET", `php/coursecontent.php?action=getQuizResource&courseId=${id}`);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);

      let quizCount = response.length;
      const quizContainer = document.querySelector(".quiz-container").querySelector("ul")
      for (let i = 0; i < quizCount; i++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <p>Exercise ${i + 1}: ${response[i].Exercise_Name}</p>
          <button onclick="goToQuizPage(${response[i].Exercise_ID})">Test Now</button>
        `;
        quizContainer.appendChild(listItem);
      }
    }
  }
}

function renderResource() {
  const xhr = new XMLHttpRequest;
  xhr.open("GET", `php/coursecontent.php?action=getCourseResource&courseId=${id}`);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);

      // let topicCount = Number(amount)
      let topicCount = response.length;
      const index = document.querySelector(".topic-count")
      index.innerHTML = `${topicCount} Chapters`
      const topicsContainer = document.querySelector(".topics");
      for (let i = 0; i < topicCount; i++) {
        const link = document.createElement('a');
        link.href = response[i].File_Path.replace("\\", "");
        link.download = response[i].Resource_Name;
        link.innerHTML = `
        <div class="individual-topic">Resource ${response[i].Chapter}: ${response[i].Resource_Name}</div>
        `
        topicsContainer.appendChild(link)
      }
    }
  }
}

function goToQuizPage(exerciseId) {
  const url = `quiz.html?exercise_id=${exerciseId}`
  // window.open(url)
  window.location.href = url;
}

function review () {
  reviewMessage.innerHTML = "";
  if (reviewInput.checkValidity()) { // check comment validity, not empty
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `php/coursecontent.php?action=addReview&courseId=${id}&comment=${reviewInput.value}`);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (!xhr.responseText) {
          alert("Comment Saved");
          courseDetailsHeader.querySelectorAll("p")[2].click();
        }
        else {
          alert("Comment failed");
        }
      }
    }
  }
  else {
    reviewMessage.innerHTML = `<i class='fa symbol'>&#xf12a</i> ${reviewInput.validationMessage}`;
  }
}

// for the course details header
const courseDetailsHeader = document.querySelector(".details-header");
courseDetailsHeader.addEventListener("click", (event) => {
  const selectedItem = event.target.closest("p");
  const contentBox = document.querySelector(".details-dynamic")
  if (selectedItem) {
    for (let child of courseDetailsHeader.children) {
      child.classList.remove("selected")
    }
    for (let child of contentBox.children) {
      child.classList.remove("selected")
    }
    selectedItem.classList.toggle("selected")

    switch (selectedItem.textContent) {
      case "About":
        document.querySelector(".about-container").classList.toggle("selected");
        break;
      case "Quiz":
        document.querySelector(".quiz-container").classList.toggle("selected");
        break;
      case "Review":
        reviewBox.innerHTML = "";
        reviewInput.value = "";

        document.querySelector(".review-container").classList.toggle("selected");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `php/coursecontent.php?action=getReview&courseId=${id}`);
        xhr.send();

        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            const review_num = response.length;
            if (review_num > 0) {
              for(let i = 0; i < review_num; i++) {
                const li = document.createElement("li");
                li.innerHTML = `<p>${response[i].Name} (${response[i].Review_Date}) :</p>
                                <p>${response[i].Comment}</p>`;
                reviewBox.appendChild(li);
              }
            }
            else {
              const li = document.createElement("li");
              li.innerHTML = "We look forward your comment about the course!";
              reviewBox.appendChild(li);
            }
          }
        }
        break;
    }
  }
})

// const progressBar = document.getElementById("progress-bar");

const resources = document.querySelectorAll(".individual-topic");
