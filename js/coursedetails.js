const courseId = new URLSearchParams(window.location.search).get("courseId");
const courseImage = document.querySelector(".course-image");
const lecturerProfile = document.querySelector(".lecturer-profile span");
const courseNo = document.querySelector("#course-no .icon1-detail2 span");
const lesson = document.querySelector("#lesson .icon1-detail2 span");
const totalParticipator = document.querySelector("#total-participator .icon2-detail1 span.icon-info");
const publishedDate = document.querySelector("#published-date .icon2-detail1 span.icon-info");
const duration = document.querySelector("#duration .icon2-detail1 span.icon-info");
const courseTitle = document.querySelector(".course-description .course-title");
const courseDescription = document.querySelector(".course-description .course-description1");
const btnContainer = document.querySelector(".button-container");
const enrollBtn = document.querySelector(".button-container .right-button1");
const deleteBtn = document.querySelector(".button-container .right-button2");


document.addEventListener("DOMContentLoaded", () => {
    if (courseId) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `php/coursedetail.php?action=get course detail&courseId=${courseId}`)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // if response is return in form of json
                    try {
                        const res = JSON.parse(xhr.responseText);
                        
                        if (res["Course_ID"]) {
                            courseImage.innerHTML = `<img src='${res["Image_Path"].replace("\\", "")}' alt='${res["Image_Name"]}'/>`;
                            lecturerProfile.innerHTML += res["Name"];
                            courseNo.innerHTML = res["Course_ID"];
                            lesson.innerHTML = res["Lesson"];
                            totalParticipator.innerHTML = res["Total_Participator"];
                            publishedDate.innerHTML = res["Published_Date"];
                            duration.innerHTML = `${res["Duration"]} minutes`;
                            courseTitle.innerHTML = res["Course_Name"];
                            courseDescription.innerHTML = res["Description"];
                            // check the user loginned or not
                            if (!loginned) {
                                enrollBtn.onclick = go_login;
                            }
                            // if loginned then check he/she enrolled the course or not
                            else if (res["enrolled"]) {
                                enrollBtn.innerHTML = "<i class='fa-solid fa-chalkboard'></i>Enter Course";
                                enrollBtn.onclick = go_course_content;
                            }
                            // check the user is the published or not
                            if (res["publisher"] == 1) {
                                deleteBtn.onclick = delete_course;
                                deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>Delete Course";
                                deleteBtn.classList.add("active");
                            }
                        }
                        // if the selected course does not exist
                        else {
                            alert("Invalid Course");
                            window.location.href = "course.html";
                        }
                    }
                    // if response is not json form
                    catch {
                        // if user havnt login
                        if (!xhr.responseText) {
                            alert("Please login to view the course");
                            window.location.href = "login.html";
                        }
                        // if system trigger error
                        else {
                            console.error(xhr.responseText);
                        }
                    }
                }
            }
        }
    }
})

function enrollCourse() {
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `php/coursedetail.php?action=enroll course&courseId=${courseId}`)
    xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr2.send();

    xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4) {
            if (xhr2.status == 200) {
                if (xhr2.responseText.includes("enroll course succes")) {
                    
                    if (xhr2.responseText.includes("10 courses")) {
                        alert("Enroll Course Successful. You can now enter the course. Congratulation, You have enroll 10 courses");
                    }
                    else if (xhr2.responseText.includes("20 courses")) {
                        alert("Enroll Course Successful. You can now enter the course. Congratulation, You have enroll 10 courses");
                    }
                    else {
                        alert("Enroll Course Successful. You can now enter the course");
                    }
                    enrollBtn.innerHTML = "<i class='fa-solid fa-chalkboard'></i>Enter Course";
                    enrollBtn.onclick = go_course_content;
                }
                else {
                    alert("Enroll Course Failed");
                }
            }
        }
    }
}

function go_login () {
    alert("Please login to enroll the course");
    window.location.href = "login.html";
}

function go_course_content () {
    window.location.href = `coursecontent.html?courseId=${courseId}`;
}

function delete_course () {
    const xhr3 = new XMLHttpRequest();
    xhr3.open("GET", `php/coursedetail.php?action=delete course&courseId=${courseId}`)
    xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr3.send();

    xhr3.onreadystatechange = function () {
        if (xhr3.readyState == 4) {
            if (xhr3.status == 200) {
                if (xhr3.responseText == "delete course success") {
                    alert("Delete Course Successful");
                    window.location.href = "course.html";
                }
                else {
                    alert("Delete Course Failed");
                    console.log(xhr3.responseText);
                }
            }
        }
    }
}
