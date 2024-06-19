// get category option from category table in database
const category = document.getElementById("category");

document.addEventListener("DOMContentLoaded", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/publish.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("action=get category");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // add those category into category option in publish box
                const category_array = JSON.parse(xhr.responseText);
                Object.keys(category_array).forEach((category_id) => {
                    const option_tag = document.createElement("option");
                    option_tag.value = category_id;
                    var category_name = category_array[category_id];
                    option_tag.innerHTML = category_name;
                    category.appendChild(option_tag);
                })
            }
        }
    }
})

// connect outer box and publish course button
const publishbox = document.getElementById("publishbox");
const exercisebox = document.getElementById("exercisebox");

/* 
set variable used for course modifying
- chapter is to know the current chapter user added until and deleted until
- chapterbox is a box to cover an chapter
*/
let chapter = 1;
const chapterbox = document.getElementsByClassName("chapterbox");

const publishCourseBtn = document.querySelector(".publishCourseBtn");
const publishcourseform = document.getElementById("publishcourseform");
const deletechapter = document.getElementById("deletechapter");
const addcontentbox = document.getElementById("addcontentbox");

/*
default means those input and message would not be remove
course image, title, description, category, duration and chapter 1 resource and exercise are default
*/
const defaultinput = document.querySelectorAll("form input[required], form select[required]");
const defaultmessage = document.querySelectorAll("form .validationmessage, form .defaultmessage");
const uploadbutton = document.getElementsByClassName("uploadbutton");
const fileupload = document.getElementsByClassName("fileupload");
const filemessage = document.getElementsByClassName("filemessage");
const cancelbutton = document.getElementsByClassName("cancel");
const cancelicon = "&#10006";

// button and message of set exercise
const setexercise = document.getElementsByClassName("setexercise");
const setexercisemessage = document.getElementsByClassName("setexercisemessage");

// connect all required input and message for verification
const requiredinput = document.getElementsByClassName("requiredinput");
const validationmessage = document.getElementsByClassName("validationmessage");

let exercise_chapter = 1;
let exercise_array = {};
let exercise_input = 1;

// this allow user to open publish course box
function display_publish_form () {
  publishbox.classList.toggle("active");

  profileContainer.classList.toggle("blur");
}

// this allow user to add one more chapter
function add_chapter() {
  chapter += 1;
  // store next chapter info into newchapter
  const chapter_div = document.createElement("div");
  newchapterhtml = `<h2 id="chapter${chapter}">Chapter ${chapter}</h2>
                  <h3>Upload Resource</h3>
                  <label>
                    <input type="file" class="fileupload requiredinput" name="resource${chapter}file" onchange='save_file(${chapter}, event)' accept=".ppt, .pptx, .txt, .pdf, .doc, .docx, .xlsx, video/*" required hidden/>
                    <input type="button" value="Upload Resource" class="uploadbutton button" onclick='file_upload(${chapter})'/>
                    <div class="messagebox">
                        <div class="filemessage"></div>
                        <div class='symbol cancel' onclick='cancel_file(${chapter})'></div>
                    </div>
                    <div class="validationmessage"></div>
                  </label>

                  <h3>Exercise</h3>
                  <label>
                    <input type="text" class='requiredinput setexercise' oninput='set_exercise(${chapter - 1})' required hidden/>
                    <input type="button" class="button" id="question" value="Set your Exercise" onclick='exercise_button(${chapter - 1})'/>
                    <div class="setexercisemessage"></div>
                    <div class="validationmessage"></div>
                  </label>
                  <hr/>`;
  chapter_div.innerHTML = newchapterhtml;
  chapter_div.className = "chapterbox"
  // write the newchapter into addcontentbox
  addcontentbox.appendChild(chapter_div);
  // if chapter more than 1 then display delete chapter button
  if (chapterbox.length > 1 && !deletechapter.className.includes("active-inline")) {
      deletechapter.classList.toggle("active-inline")
  }
}

// this allow user to delete chapter
function delete_chapter () {
  chapter -= 1;
  // find the index of last chapter box in the chapter box nodelist
  const lastchapterbox = chapterbox.length - 1;
  // remove the last chapter box and refresh the chapter box nodelist
  chapterbox[lastchapterbox].remove();
  // if remain one chapter, then disappear delete chapter button
  if (chapterbox.length == 1) {
      deletechapter.classList.toggle("active-inline");
  }
}

function publish () {
  let requiredinput_array = Array.from(requiredinput);
  let validation = true;

  requiredinput_array.forEach((input, sequence) => {
      validationmessage[sequence].innerHTML = "";
      if (!input.checkValidity()) {
          validation = false;
          if (input.className.includes("setexercise")) {
              validationmessage[sequence].innerHTML = `<i class='fa symbol'>&#xf12a</i>  Please set a exercise.`
          }
          else {
              validationmessage[sequence].innerHTML = `<i class='fa symbol'>&#xf12a</i>  ${input.validationMessage}`;
          }
      }
  })
  if (validation) {
      let fileupload_array = Array.from(fileupload);
      let form = new FormData(publishcourseform);

      fileupload_array.forEach((file) => {
          let name = file.name;
          let file_content = file.files[0];
          form.set(name, file_content);
      })

      form.set("exercise", JSON.stringify(exercise_array));
      
      form.set("action", "insert course");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "php/publish.php");
      xhr.send(form);
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  close_publish_box();
                  alert(xhr.responseText);
                  if (xhr.responseText == "You session have been expired") {
                      window.location.href = "login.html";
                  }
              }
          }
      }
  }
}
  
// this allow user to close the publish course box
function close_publish_box () {
  /*
  Set the publish course box to default
  - delete all additional chapter
  - delete all value in input
  - delete all message including error message and file message
  */
  let deletable_chapter = chapter;
  for (dlt = 1; dlt < deletable_chapter; dlt++) {
      delete_chapter();
  }      

  defaultinput.forEach((input) => {
      input.value = "";
  })

  defaultmessage.forEach((message) => {
    message.innerHTML = "";
  })

  publishbox.classList.toggle("active");
  exercise_array = {};

  profileContainer.classList.toggle("blur");
}

function file_upload (index) {
      fileupload[index].click();
}

function save_file (index, event) {
    file_info = event.target.files;
    filemessage[index].innerHTML = "";
    cancelbutton[index].innerHTML = "";
    if (file_info['0']) {
        file_name = file_info['0']['name'];
        filemessage[index].innerHTML = `${file_name}`;
        cancelbutton[index].innerHTML = `${cancelicon}`;
    }
}

function cancel_file (index) {
    fileupload[index].value = "";
    filemessage[index].innerHTML = "";
    cancelbutton[index].innerHTML = "";
}

function set_exercise (index) {
  setexercisemessage[index].innerHTML = "";
  if (setexercise[index].value) {
      setexercisemessage[index].innerHTML = `${exercise_array[index + 1][1].length} Question Setted`;
  }
}

function exercise_button (index) {
  publishbox.classList.toggle("active");
  exercisebox.classList.toggle("active");
  exercise_chapter = index + 1;
  if (exercise_chapter != 1) {
      var exercisetitle = document.getElementById("exercisetitle");
      exercisetitle.innerHTML = `Chapter ${exercise_chapter} Exercise`;
  }
  window.location.href = "profile.html#exercisebox";
  exercise_input = requiredinput[(6 + (2*(exercise_chapter - 1)))]
}

// exercise page
let question = 1;
const questionbox = document.getElementsByClassName("questionbox");

const addquestioncontent = document.getElementById("addquestioncontent");
const deletequestion = document.getElementById("deletequestion");

const defaultexercise = document.querySelectorAll(".defaultexercise");
const defaultanswer = document.querySelectorAll(".defaultanswer");
const defaultexercisemessage = document.querySelectorAll(".defaultexercisemessage");

const exercisename = document.getElementById("exercisename");
const exercisemessage = document.getElementById("exercisemessage");

const requiredquestion = document.getElementsByClassName("requiredquestion");
const questionmessage = document.getElementsByClassName("questionmessage");
const questionoption = document.getElementsByClassName("questionoption");

const requiredanswer = document.getElementsByClassName("requiredanswer");
const answermessage = document.getElementsByClassName("answermessage");

// simulate input event for exercise input
const input_event = new Event("input", {
  bubbles: true, 
  cancelable: true
})

function add_question () {
  question++;
  const exercise_div = document.createElement("div");
  const newquestion = `<label for="question${question}">
                      <h3>Question ${question}</h3>
                      <input type="text" class="inputbox requiredquestion" id="question${question}" placeholder="Question ${question} Description" required/>
                      <div class="questionmessage"></div>
                  </label>
                  <label for="question${question}A">
                      &emsp;Option A:
                      <input type="text" class="optionbox questionoption" id="question${question}A" placeholder="Option A Description"/>
                  </label>
                  <label for="question${question}B">
                      &emsp;Option B:
                      <input type="text" class="optionbox questionoption" id="question${question}B" placeholder="Option B Description"/>
                  </label>
                  <label for="question${question}C">
                      &emsp;Option C:
                      <input type="text" class="optionbox questionoption" id="question${question}C" placeholder="Option C Description"/>
                  </label>
                  <label for="question${question}D">
                      &emsp;Option D:
                      <input type="text" class="optionbox questionoption" id="question${question}D" placeholder="Option D Description"/>
                  </label>
                  <div class="answerbox">
                      Answer:
                      <label for="question${question}answerA">
                          A <input type="radio" id="question${question}answerA" class="requiredanswer" name="question${question}answwer" value="A" required/>
                      </label>
                      <label for="question${question}answerB">
                      B <input type="radio" id="question${question}answerB" class="requiredanswer" name="question${question}answwer" value="B" required/>
                      </label>
                      <label for="question${question}answerC">
                          C <input type="radio" id="question${question}answerC" class="requiredanswer" name="question${question}answwer" value="C" required/>
                      </label>
                      <label for="question${question}answerD">
                          D <input type="radio" id="question${question}answerD" class="requiredanswer" name="question${question}answwer" value="D" required/>
                      </label>
                  </div>
                  <div class="answermessage"></div>`;
  exercise_div.innerHTML = newquestion;
  exercise_div.className = "questionbox";
  addquestioncontent.appendChild(exercise_div);
  if (questionbox.length > 1 && !deletequestion.className.includes("active-inline")) {
      deletequestion.classList.toggle("active-inline");
  }
}

function delete_question() {
  question -= 1;
  const lastquestionbox = questionbox.length - 1;
  questionbox[lastquestionbox].remove();
  if (questionbox.length == 1) {
      deletequestion.classList.toggle("active-inline");
  }
}

function close_exercise_button () {
  delete_times = question
  for (dlt = 1; dlt < delete_times; dlt++) {
      deletequestion.click();
  }

  defaultexercise.forEach((input) => {
      input.value = ""
  })

  defaultanswer.forEach((answer) => {
      answer.checked = false;
  })

  defaultexercisemessage.forEach((message) => {
      message.innerHTML = "";
  })

  exercisebox.classList.toggle("active");
  publishbox.classList.toggle("active");
}

function save_exercise () {
  let validation = true;
  let answerlist = [];
  let question_answer = [];

  let requiredquestion_array = Array.from(requiredquestion);
  let requiredanswer_array = Array.from(requiredanswer);
  let questionoption_array = Array.from(questionoption);

  exercisemessage.innerHTML = "";
  if (!exercisename.checkValidity()) {
      validation = false;
      exercisemessage.innerHTML = `<i class='fa symbol'>&#xf12a</i>  ${exercisename.validationMessage}`;
  }

  requiredquestion_array.forEach((question, sequence) => {
      questionmessage[sequence].innerHTML = "";
      answermessage[sequence].innerHTML = "";
      if (!question.checkValidity()) {
          validation = false;
          questionmessage[sequence].innerHTML = `<i class='fa symbol'>&#xf12a</i>  ${question.validationMessage}`;
      }
  })

  requiredanswer_array.forEach((answer, sequence) => {
      answerlist.push(answer);
      if ((sequence + 1) % 4 == 0) {
          for (index = 0; index < answerlist.length; index++) {
              answervalid = answerlist[index].checked;
              if (answervalid) {
                  question_answer.push(answerlist[index].value);
                  answerlist = [];
                  break;
              }
          }
          if (!answervalid) {
              validation = false;
              answermessage[((sequence + 1) / 4) -1].innerHTML = "<i class='fa symbol'>&#xf12a</i>  Please select one answer";
          }
      }
  })

  if (validation) {
      let question_description = requiredquestion_array.map((question) => {return question.value;})
          
      let question_option = [];
      let temp_list = []
      questionoption_array.forEach((option) => {
          temp_list.push(option.value);

          if (temp_list.length == 4) {
              question_option.push(temp_list);
              temp_list = [];
          }
      })
      exercise_array[exercise_chapter] = [exercisename.value, 
                                          question_description,
                                          question_option,
                                          question_answer
                                      ]

      exercise_input.value = exercise_array[exercise_chapter];
      exercise_input.dispatchEvent(input_event);
      close_exercise_button();
  }
}
