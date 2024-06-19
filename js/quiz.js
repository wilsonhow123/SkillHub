document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.href;
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const questionId = searchParams.get('exercise_id');

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `php/quiz.php?exercise_id=${questionId}`);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText)

      const questionAmount = response.length;

      renderQuestion(questionAmount, response);
    }
  }
})

// let correct = 0;

// function renderQuestion(qNumber, response) {
//   for (let i = 0; i < qNumber; i++) { // manual iteration here
//     if ((i + 1) === qNumber) {
//       const questionTitle = document.querySelector(".question-title");
//       questionTitle.innerHTML = `${response[i].Question_No}. ${response[i].Description}`;

//       const questionContainer = document.querySelector(".individual-question");
//       let choice = document.createElement('div');
//       choice.classList.add("choices")
//       choice.innerHTML = `
//       <div class="choice choice-1" data-value="A" onclick="select(this)">A. ${response[i].OptionA}</div>
//       <div class="choice choice-2" data-value="B" onclick="select(this)">B. ${response[i].OptionB}</div>
//       <div class="choice choice-3" data-value="C" onclick="select(this)">C. ${response[i].OptionC}</div>
//       <div class="choice choice-4" data-value="D" onclick="select(this)">D. ${response[i].OptionD}</div>

//       <div class="buttons">
//         <button onclick="submit('${qNumber}', '${response[i].Course_ID}', '${response[i].Answer}')">Submit</i></button>
//       </div>
//       `;
//       questionContainer.appendChild(choice);
//     } else {
//       const questionTitle = document.querySelector(".question-title");
//       questionTitle.innerHTML = `${response[i].Question_No}. ${response[i].Description}`;

//       const questionContainer = document.querySelector(".individual-question");
//       let choice = document.createElement('div');
//       choice.classList.add("choices")
//       choice.innerHTML = `
//       <div class="choice choice-1" data-value="A" onclick="select(this)">A. ${response[i].OptionA}</div>
//       <div class="choice choice-2" data-value="B" onclick="select(this)">B. ${response[i].OptionB}</div>
//       <div class="choice choice-3" data-value="C" onclick="select(this)">C. ${response[i].OptionC}</div>
//       <div class="choice choice-4" data-value="D" onclick="select(this)">D. ${response[i].OptionD}</div>

//       <div class="buttons">
//         <button onclick="nextQuestion('${response[i].Answer}')">Next Question <i class="fa-solid fa-arrow-right"></i></button>
//       </div>
//       `;
//       questionContainer.appendChild(choice);
//     }
//   }
// }

let correct = 0;

async function renderQuestion(qNumber, response) {
  for (let i = 0; i < qNumber; i++) {
    await new Promise(resolve => {
      if ((i + 1) === qNumber) {
        const questionTitle = document.querySelector(".question-title");
        questionTitle.innerHTML = `${response[i].Question_No}. ${response[i].Description}`;

        const questionContainer = document.querySelector(".individual-question");
        let choice = document.createElement('div');
        choice.classList.add("choices")
        choice.innerHTML = `
          <div class="choice choice-1" data-value="A" onclick="select(this)">A. ${response[i].OptionA}</div>
          <div class="choice choice-2" data-value="B" onclick="select(this)">B. ${response[i].OptionB}</div>
          <div class="choice choice-3" data-value="C" onclick="select(this)">C. ${response[i].OptionC}</div>
          <div class="choice choice-4" data-value="D" onclick="select(this)">D. ${response[i].OptionD}</div>

          <div class="buttons">
            <button onclick="submit('${qNumber}', '${response[i].Course_ID}', '${response[i].Answer}')">Submit</i></button>
          </div>
        `;
        questionContainer.appendChild(choice);

        // Resolve the promise when the button is clicked
        document.querySelector(".buttons button").addEventListener("click", function () {
          resolve();
        });
      } else {
        const questionTitle = document.querySelector(".question-title");
        questionTitle.innerHTML = `${response[i].Question_No}. ${response[i].Description}`;

        const questionContainer = document.querySelector(".individual-question");
        let choice = document.createElement('div');
        choice.classList.add("choices")
        choice.innerHTML = `
          <div class="choice choice-1" data-value="A" onclick="select(this)">A. ${response[i].OptionA}</div>
          <div class="choice choice-2" data-value="B" onclick="select(this)">B. ${response[i].OptionB}</div>
          <div class="choice choice-3" data-value="C" onclick="select(this)">C. ${response[i].OptionC}</div>
          <div class="choice choice-4" data-value="D" onclick="select(this)">D. ${response[i].OptionD}</div>

          <div class="buttons">
            <button>Next Question <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        `;
        questionContainer.appendChild(choice);

        // Resolve the promise when the button is clicked
        document.querySelector(".buttons button").addEventListener("click", function () {
          if (checkAnswer(response[i].Answer)) {
            const removeElement = document.querySelector(".choices");
            removeElement.remove()
            resolve();
          } else {
            window.alert("Please choose an answer!")
          }
        });
      }
    });
  }
}

function select(item) {
  const choice = document.querySelectorAll(".choice");
  const isSelected = item.classList.contains("selected");

  choice.forEach((i) => {
    i.classList.remove("selected");
  })

  item.classList.toggle("selected", !isSelected);
}

function checkAnswer(answer) {
  let selection = '';
  const choices = document.querySelectorAll(".choice");
  choices.forEach((i) => {
    if (i.classList.contains("selected")) {
      selection = i.dataset.value;
    }
  })
  if (selection === answer) {
    correct++
  }
  if (selection.length > 0) {
    return true
  } else {
    return false
  }
}

function submit(totalQuestions, id, answer) {
  if (checkAnswer(answer)) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
    <div class="popup-box">
        <h3>Results</h3>
        <p class="percentage">${(correct/Number(totalQuestions)) * 100}%</p>
        <p class="msg">Well Done!</p>
        <div class="markings">
          <div class="marking mistakes">
            <p>${Number(totalQuestions) - correct}/${totalQuestions}</p>
            <span>Mistakes</span>
          </div>
          <div class="marking correct">
            <p>${correct}/${totalQuestions}</p>
            <span>Correct</span>
          </div>
        </div>
        <button class="back-to-course" onclick="backToCourse(${id})">Back to Course</button>
      </div>
    `
    document.body.appendChild(popup);
  } else {
    window.alert("Please choose an answer!")
  }
}

function backToCourse(id) {
  url = `coursecontent.html?courseId=${id}`
  window.location.href = url;
}