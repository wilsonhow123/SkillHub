const otherSelection = document.getElementById("other");
const customInput = document.getElementById("custom-amount-box");
const mainSelection = document.querySelector(".amount-selection")

mainSelection.addEventListener("click", () => {
  if (otherSelection.checked) {
    customInput.classList.add("active");
  } else {
    customInput.classList.remove("active");
  }
})
