const selectionList = document.querySelector(".profile-setting-selections")
const container = document.getElementById("setting-content-box");

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

function renderContainer(listItem) {
  container.innerHTML = ""

  const div = document.createElement("div");

  if (listItem === 'view-profile') {
    div.classList.add("view-profile");
    div.innerHTML = `
    <div>
      <p>Username</p>
      <span>@Plum</span>
    </div>
    <div>
      <p>Full Name</p>
      <span>Low Tian Wei</span>
    </div>
    <div>
      <p>Date of Birth</p>
      <span>10/03/2004</span>
    </div>
    <div>
      <p>Gender</p>
      <span>Male</span>
    </div>
    <div>
      <p>Email</p>
      <span>plum@gmail.com</span>
    </div>
    <button id="edit-information" onclick="editInformation()">Edit Information</button>
    `
  } else if (listItem === 'profile-settings') {
    div.classList.add("profile-settings");
    div.innerHTML = `
    <div class="username">
      <label for="username">Username</label>
      <span>Your URL: https://www.skillhub/en/user/plum</span>
      <input type="text" id="username">
    </div>
    <fieldset class="privacy">
      <legend>Privacy</legend>
      <div>
        <input type="checkbox" id="visible-profile">
        <label for="visible-profile">Make my profile visible to everyone on SkillHub</label>
      </div>
      <div>
        <input type="checkbox" id="hide-courses">
        <label for="hide-courses">Hide the list of completed courses on my profile</label>
      </div>
      <div>
        <input type="checkbox" id="allow-profile-search">
        <label for="allow-profile-search">Allow my profile to appear in search results</label>
      </div>
    </fieldset>
    <button id="save-profile-settings">Save Changes</button>
    `
  } else if (listItem === 'password') {
    div.classList.add("password")
    div.innerHTML = `
    <p>We've initiated a password change request for your SkillHub account. A verification email has been sent to <a href="#">plum@gmail.com</a></p>
    <span>Please check your inbox and follow the instructions to securely update your password. If you haven't received the email, please check your spam folder or request another verification."</span>
    <button id="reset-password" onclick="">Reset Password</button>
    `
  } else if (listItem === 'my-courses') {
    div.classList.add('my-courses');
    div.innerHTML = `
    <div class="my-courses">
            <h1>My Courses</h1>
            <ul class="my-courses-selection">
              <li data-selection="all-courses">All Courses</li>
              <li data-selection="favourite-courses">Favourites</li>
              <li data-selection="completed-courses">Completed Courses</li>
            </ul>
            <div class="my-individual-courses">
              <div class="individual-course">
                <img src="img/course-img/motivation-course.png" alt="">
                <div class="course-content">
                  <div class="students-length">
                    <p>1240 students</p>
                    <p>40m</p>
                  </div>
                  <h3>Motivation: How to get motivated</h3>
                  <div class="tutor-bookmark">
                    <p>Emma Johnson</p>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                </div>
              </div>

              <div class="individual-course">
                <img src="img/course-img/ml-course.png" alt="">
                <div class="course-content">
                  <div class="students-length">
                    <p>10000 students</p>
                    <p>4h 30m</p>
                  </div>
                  <h3>Machine Learning: Regression and Classification</h3>
                  <div class="tutor-bookmark">
                    <p>Andrew Ng</p>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                </div>
              </div>

              <div class="individual-course">
                <img src="img/course-img/financial-course.png" alt="">
                <div class="course-content">
                  <div class="students-length">
                    <p>1290 students</p>
                    <p>1h 20m</p>
                  </div>
                  <h3>Financial Markets: Introduction</h3>
                  <div class="tutor-bookmark">
                    <p>Robert J. Shiler</p>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                </div>
              </div>

              <div class="individual-course">
                <img src="img/course-img/psychology-course.png" alt="">
                <div class="course-content">
                  <div class="students-length">
                    <p>340 students</p>
                    <p>40m</p>
                  </div>
                  <h3>Psychology: Introduction</h3>
                  <div class="tutor-bookmark">
                    <p>Jeremy Wolfe</p>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                </div>
              </div>

              <div class="individual-course">
                <img src="img/course-img/well-being-course.png" alt="">
                <div class="course-content">
                  <div class="students-length">
                    <p>1420 students</p>
                    <p>2h 30m</p>
                  </div>
                  <h3>The Science of Well-Being</h3>
                  <div class="tutor-bookmark">
                    <p>Layrie Santos</p>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                </div>
              </div>

              <div class="individual-course">
                <img src="img/course-img/khan-course.png" alt="">
                <div class="course-content">
                  <div class="students-length">
                    <p>1220 students</p>
                    <p>3h 20m</p>
                  </div>
                  <h3>Khan Academy Kids</h3>
                  <div class="tutor-bookmark">
                    <p>Khan Academy</p>
                    <i class="fa-solid fa-bookmark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
  }

  container.appendChild(div)
}

function editInformation() {
  container.innerHTML = ""

  const div = document.createElement("div")
  div.classList.add("edit-profile")
  div.innerHTML = `
    <div class="question">
      <label for="username">Username</label>
      <input type="text" id="username">
    </div>
    <div class="question">
      <label for="full-name">Full Name</label>
      <input type="text" id="full-name">
    </div>
    <div class="question">
      <label for="dob">Date of Birth</label>
      <input type="date" id="dob">
    </div>
    <div class="question">
      <label for="gender">Gender</label>
      <select name="gender" id="gender">
        <option value="" selected>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="null">Prefer not to say</option>
      </select>
    </div>
    <div class="question">
      <label for="email">Email</label>
      <input type="text">
    </div>
    <div class="edit-profile-buttons">
      <button id="save-profile">Save</button>
      <button id="cancel-edit-profile" onclick="renderContainer('view-profile')">Cancel</button>
    </div>
  `;
  container.appendChild(div)
}