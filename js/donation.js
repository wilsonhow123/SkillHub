const amountOption = document.querySelectorAll("fieldset input[type=radio]");
const otherSelection = document.getElementById("other");
const customInput = document.getElementById("custom-amount-box");
const mainSelection = document.querySelector(".amount-selection");
const insertFile = document.querySelector("#insert-file");
const fileContent = document.querySelector(".file-content");
const amountOptionMessage = document.querySelector(".amount-option-message");
const customAmountMessage = document.querySelector(".custom-amount-message");

mainSelection.addEventListener("click", () => {
  if (otherSelection.checked) {
    customInput.classList.add("active");
  } else {
    customInput.classList.remove("active");
  }
})

// triger file button to enable user select file
function upload_file () {
  insertFile.click();
}

// when file changed, display its information
function receive_file () {
  file_info = event.target.files;
  fileContent.innerHTML = "";
  if (file_info["0"]) {
    file_name = file_info['0']['name'];
    fileContent.innerHTML = `${file_name} <i class="fa fa-close" onclick="cancelFile()"></i>`;
  }
}

// remove file 
function cancelFile () {
  document.querySelector("#insert-file").files.value = "";
  fileContent.innerHTML = "";
}

// submit input and verify it
function submit_donation () {
  let validation = true;
  let chosen = false;
  let amount = 0;

  amountOptionMessage.innerHTML = "";
  customAmountMessage.innerHTML = "";

  // verify option
  amountOption.forEach((option) => {
    if (option.checked) {
      chosen = true;
      amount = option.id;
    }
  })

  // display message if not selected
  if (!chosen) {
    amountOptionMessage.innerHTML = "<i class='fa symbol'>&#xf12a</i> Please select an item"
  }

  // if custom amount then check the amount input
  if (otherSelection.checked) {
    if (customInput.value.length == 0 || customInput.value == 0) {
      validation = false;
      customAmountMessage.innerHTML = "<i class='fa symbol'>&#xf12a</i> Please enter amount";
    }
    else {
      amount = customInput.value;
    }
  }

  if (!insertFile.checkValidity()) {
    validation = false;
    fileContent.innerHTML = "<i class='fa symbol'>&#xf12a</i> Please upload receipt for proven";
  }

  if (validation && chosen) {
    const form = new FormData();
    form.set("action", "add donation");
    form.set("amount", amount);
    form.set("receipt", insertFile.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/donation.php");
    xhr.send(form);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (!xhr.responseText) {
            alert ("Your donation record saved. Thank you for your donation");
            window.location.reload();
          }
          else {
            alert ("Your donation record fail to save. Please make ensure you have login");
            console.error(xhr.responseText);
          }
        }
      }
    }
  }
}
