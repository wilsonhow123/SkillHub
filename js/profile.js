let res;
const xhr = new XMLHttpRequest();
const profileContainer = document.querySelector(".container");
const userData = document.querySelectorAll(".user p, .user span");
const selectionList = document.querySelector(".profile-setting-selections");
let myCourseSelectionList = document.querySelector(".my-courses-selection");
const container = document.getElementById("setting-content-box");
const userInfo = document.querySelectorAll(".view-profile span");
const editProfileInput = document.querySelectorAll(".edit-profile input, .edit-profile select");
const editProfileMessage = document.querySelectorAll(".edit-profile .message");
const editPasswordInput = document.querySelectorAll(".password input");
const editPasswordMessage = document.querySelectorAll(".password .message");
const requestBtn = document.querySelector(".requestBtn");
const submitBtn = document.querySelector(".submitbutton[value=Publish]");
const courseBox = document.querySelector(".my-individual-courses");

// get use info from session
 document.addEventListener("DOMContentLoaded", () => {
  xhr.open("POST", "php/central.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("identification=1");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // if user loginned already
        if (xhr.responseText) {
          res = JSON.parse(xhr.responseText);
          // show user info
          display_user_info(res);
          renderContainer("view-profile");
          display_course ("all-courses");
          display_badge();
        }
        else {
          alert("Sorry your session expired! Please login again");
          window.location.href = "login.html";
        }
      }
    }
  }
})

// display user information to user
function display_user_info(res) {
  userInfo.forEach((data) => {
    data.innerHTML = res[data.className];
  })

  userData.forEach((data) => {
    data.innerHTML = res[data.className];
    if (data.className == "Role") {
      if (res[data.className] != "Student") {
        publishCourseBtn.classList.toggle("active");
        publishCourseBtn.onclick = display_publish_form;
        submitBtn.onclick = publish;
        myCourseSelectionList.innerHTML += '<li data-selection="published-courses">Published Course</li>';
        myCourseSelectionList = document.querySelector(".my-courses-selection");
      }
      if (res[data.className] == "Admin") {
        requestBtn.classList.toggle("active");
        requestBtn.onclick = direct_request;
      }
    }
  })
}

function display_course (selection) {
  xhr.open("GET", `php/profile.php?action=${selection}`);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const course = JSON.parse(xhr.responseText);
        courseBox.innerHTML = "";
        if (Object.keys(course).length > 0) {
          Object.keys(course).forEach((course_id) => {
            const courseInfo = course[course_id];
            const div = document.createElement("div");
            div.className = "individual-course";
            div.innerHTML = `<img src="${courseInfo["Image_Path"].replace("\\", "")}" alt="${courseInfo["Image_Name"]}">
                              <div class="course-content">
                                <div class="students-length">
                                  <p>${courseInfo["Total_Participator"]} Participator</p>
                                  <p>${courseInfo["Duration"]}m</p>
                                </div>
                                <h3>${courseInfo["Course_Name"]}</h3>
                                <div class="tutor-bookmark">
                                  <p>${courseInfo["Name"]}</p>
                                  <i class="fa-solid fa-bookmark"></i>
                                </div>
                              </div>
                            `
            div.onclick = function () {
              const url = `coursedetails.html?courseId=${course_id}`;
              window.location.href = url;
            }
            courseBox.appendChild(div);
          })
        }
        else {
          const div = document.createElement("div");
          div.className = "no-individual-course";
          div.innerHTML = "No Course";
          courseBox.appendChild(div);
        }
      }
    }
  }
}

function display_badge() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "php/profile.php?action=getBadges", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      try {
        const res = JSON.parse(xhr.responseText);
        const badgeContainer = document.getElementById("badge-container"); //Select badge container

        // Loop through each badge and create HTML for it
        res.forEach(badge => {
          const html = `<div class="individual-badge">
                          <img src="${badge.Badge_Image}" alt="">
                          <p>${badge.Badge_Type}</p>
                          <span class="badge-description">${badge.Badge_Description}</span>
                          <div class="badge-rating">
                            <div>
                              <p>${badge.Date_Achieved}</p>
                            </div>
                          </div>
                        </div>`;
          badgeContainer.insertAdjacentHTML('beforeend', html); // Append the HTML to the container
        });
      } catch (error) {
        console.error("Error parsing badge data:", error);
      }
    }
  };
}

function direct_request () {
  window.location.href = "processRequest.html";
}

selectionList.addEventListener("click", (event) => {
  const listItem = event.target.closest("li");
  for (const child of selectionList.children) {
    child.classList.remove("selected")
  }
  if (listItem) {
    const selection = listItem.dataset.selection;
    // console.log(selection);
    listItem.classList.toggle("selected")
    renderContainer(selection)
  }
})

myCourseSelectionList.addEventListener("click", (event) => {
  const courseListItem = event.target.closest("li");
  for (const listChild of myCourseSelectionList.children) {
    listChild.classList.remove("selected")
  }
  if (courseListItem) {
    const courseSelection = courseListItem.dataset.selection;
    courseListItem.classList.toggle("selected");
    display_course(courseSelection)
  }
})



function renderContainer(listItem) {
  const boxes = document.querySelectorAll(".view-profile, .edit-profile, .password, .my-courses");

  boxes.forEach((box) => {
    box.classList.remove("hide");
    if (!box.className.includes(listItem)) {
      box.classList.toggle("hide");
    }
  })

}

function editInformation() {
  renderContainer("edit-profile");
}

function cancel_edit_profile () {
  document.querySelector("li[data-selection='view-profile']").click();
}

function save_profile () {
  console.log(res)
  let validation = true;

  editProfileInput.forEach((input, index) => {
    editProfileMessage[index].innerHTML = "";
    if (!input.checkValidity()) {
      validation = false;
      editProfileMessage[index].innerHTML = `<i class='fa symbol'>&#xf12a</i> ${input.validationMessage}`;
    }
  })

  if (validation) {

    userInfo.forEach((data, index) => {
      res[data.className] = editProfileInput[index].value;
    })

    xhr.open("POST", "php/profile.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(res))
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (xhr.responseText == "success") {
            alert("Update Profile Success");
                    
            display_user_info(res);

            editProfileInput.forEach((input) => {
              input.value = "";
            })

            document.querySelector("li[data-selection='view-profile']").click();
          }
          else if (xhr.responseText == "expired") {
            alert("Sorry your session expired! Please login again");
            window.location.href = "login.html";
          }
          else {
            editProfileMessage[editProfileMessage.length - 1].innerHTML = `<i class='fa symbol'>&#xf12a</i> Email Already Exist`
          }
        }
      }
    }
  }
}

function reset_password () {
  let validation = true;

  editPasswordInput.forEach((input, index) => {
    editPasswordMessage[index].innerHTML = "";
    if (!input.checkValidity()) {
      validation = false;
      editPasswordMessage[index].innerHTML = `<i class='fa symbol'>&#xf12a</i> ${input.validationMessage}`;
    }
  })


  if (validation) {
    if (editPasswordInput[1].value != editPasswordInput[0].value) {
      validation = false;
      editPasswordMessage[1].innerHTML = "<i class='fa symbol'>&#xf12a</i> Confirm password does not match new password";
    }
  }

  if (validation) {
    xhr.open("POST", "php/profile.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`action=reset password&newPassword=${editPasswordInput[0].value}`)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (xhr.responseText == "reset password success") {
            alert ("Reset Password Success");

            editPasswordInput.forEach((input) => {
              input.value = "";
            })
          }
          else {
            alert("Reset Password Fail");
          }
        }
      }
    }

  }


}
