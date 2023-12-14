function homeButton() {
  const url = "main.html"
  window.location.href = url
}

function faqPage() {
  const url = "faq.html"
  window.open(url)
}

function loggedIn() {
  userProfile.classList.toggle("active")
}

const userProfile = document.getElementById("user-profile")
  // userProfile.classList.add("active")

// userProfile.addEventListener("click", () => {
//   // console.log("clicked")
//   loggedIn()
// })

function checkLogInStatus() {
  // const loggedIn = ""
  const logInBtn = document.querySelector(".login")
  const signUpBtn = document.querySelector(".sign-up")
  // if (loggedIn) {
  //   logInBtn.classList.toggle("hide");
  //   signUpBtn.classList.toggle("hide");
  //   userProfile.classList.toggle("active");
  // }
  logInBtn.classList.toggle("hide");
  signUpBtn.classList.toggle("hide");
  userProfile.classList.toggle("active");
}

userProfile.addEventListener("click", () => {
  const url = "profile.html"
  window.location.href = url;
})