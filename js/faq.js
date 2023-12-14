const question = document.querySelectorAll(".individual-question")

question.forEach((element) => {
  element.addEventListener("click", () => {
    const answer = element.querySelector(".question-answer");
    const expandIcon = element.querySelector(".expand-icon");
    element.classList.toggle("expand")
    answer.classList.toggle("active");
    expandIcon.classList.toggle("rotate");
  })
})

const box = document.getElementById("search-faq");
const title = document.getElementsByTagName("h3")

box.addEventListener("input", (event) => {
  const value = event.target.value;
  const title = document.getElementsByTagName("h3")
  console.log(value);
  title.forEach((question) => {
    // if (sentence.includes(value)) {
    //   console.log("indeed")
    // }
    console.log((question));
  })
})
