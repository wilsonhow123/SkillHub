const logInBtn = document.querySelector("li #login")
const signUpBtn = document.querySelector("li #sign-up")
const userProfile = document.getElementById("user-profile")
const courseBtn = document.getElementById("course")
const headerList = document.querySelector(".header-list")
let clicked = false
let loginned = false;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.about) {
    scrollSection("scroll-here");
    localStorage.removeItem("about");
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "php/central.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("identification=1")
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // if user loginned already
        if (xhr.responseText) {
          loginned = true;
          headerList.innerHTML += `<li>
                                    <button id="user-profile" onclick="display_profile_option()">
                                      <img src='img/user-icon/profile.png'>
                                    </button>
                                  </li>`
        }
        else {
          headerList.innerHTML += `<li>
                                      <button id="login" onclick="loginPage()">Login</button>
                                    </li>
                                    <li>
                                      <button id="sign-up" onclick="sign_upPage()">Sign Up</button>
                                    </li>`
        }
      }
    }
  }
})

function display_profile_option() {
  const headerRight = document.querySelector(".header-right");
  if (clicked) {
    headerRight.removeChild(document.querySelector(".profile-option"));
    clicked = false;
  }
  else {
    const ul = document.createElement("ul");
    ul.className = "profile-option";
    ul.innerHTML = `<li>
                      <div id="go-profile" onclick="go_profile()">Profile</div>
                    </li>
                    <li>
                      <div id="log-out" onclick="log_out()">Log Out</div>
                    </li>
                  </ul>`;
    headerRight.appendChild(ul);
    clicked = true;                               
  }
}

function homeButton() {
  const url = "main.html";
  window.location.href = url;
}

function scrollSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({behavior: 'smooth'});
  }
  else {
    localStorage.about = true;
    window.location.href = "main.html";
  }
}

function coursePage() {
  const url = "course.html";
  window.location.href = url;
}

function faqPage() {
  const url = "faq.html";
  window.location.href = url;
}

function loggedIn() {
  userProfile.classList.toggle("active");
}

function loginPage () {
  const url = "login.html";
  window.location.href = url;
}

function sign_upPage () {
  const url = "login.html?sign-up";
  window.location.href = url;
}

function log_out () {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "php/central.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("logOut=1");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        window.location.href = "login.html";
      }
    }
  }
}

function go_profile () {
  const url = "profile.html"
  window.location.href = url;
}