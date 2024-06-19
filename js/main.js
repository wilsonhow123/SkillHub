const linkButton = document.getElementById("donation-icon")
linkButton.addEventListener("click", donationPage)

function donationPage() {
  const url = "donation.html";
  window.location.href = url;
}

// faq section
const q1 = "SkillHub is a free and open-source education platform that thrives on a volunteer-based community. We provide accessible learning opportunities with a diverse range of high-quality courses contributed by educators globally.";
const q2 = "Yes, SkillHub is committed to providing free and open education. Learners can access a wide range of courses without any cost, ensuring equal opportunities for everyone.";
const q3 = "Yes, SkillHub is committed to providing free and open education. Learners can access a wide range of courses without any cost, ensuring equal opportunities for everyone.";
const q4 = "Donations play a crucial role in sustaining and expanding SkillHub. They are used to maintain the platform, enhance features, and support initiatives that advance our mission of accessible education.";
const q5 = "Stay connected with SkillHub by subscribing to our newsletter or following us on social media. We regularly share updates on new courses, features, and community activities.";

function expand(question) {
  const allMainQuestions = document.querySelectorAll(".individual-question");
  const isExpanded = question.classList.contains("expand");
  const icon = question.querySelector(".expand-icon");

  // remove everything and set to default
  allMainQuestions.forEach(i => {
    const answerBox = i.querySelector(".answer");
    if (answerBox) {
      answerBox.remove();
    }
    i.classList.remove("expand");
  });

  // main animation
  icon.classList.toggle("rotate", !isExpanded);
  question.classList.toggle("expand", !isExpanded);

  // create answerbox when expanded
  if (question.classList.contains("expand")) {
    const id = question.id;
    const answerBox = document.createElement("p");
    answerBox.classList.add("answer");

    switch (id) {
      case 'q1':
        answerBox.innerHTML = q1;
        break;
      case 'q2':
        answerBox.innerHTML = q2;
        break;
      case 'q3':
        answerBox.innerHTML = q3;
        break;
      case 'q4':
        answerBox.innerHTML = q4;
        break;
      case 'q5':
        answerBox.innerHTML = q5;
        break;
      default:
        answerBox.innerHTML = "TBC."
    }

    question.appendChild(answerBox)
  }
}

// direct to course page
function course () {
  const url = "course.html";
  window.location.href = url;
}

function apply_tutor () {
  let url = "applytutor.html";
  if (!loginned) {
    alert("Please login to apply as tutor");
    url = "login.html";
  }
  window.location.href = url;
}
