document.addEventListener("DOMContentLoaded", function () {
    const blur = document.getElementById("blur");
    const registration_box = document.querySelector(".registration");

    const registerbutton = document.getElementById("register");
    const loginbutton = document.getElementById("login");
    const box = document.getElementById("box");

    // input variable
    const registerInput = document.querySelectorAll(".register input");
    const loginInput = document.querySelectorAll(".login input");
    const registrationInput = document.querySelectorAll(".registration input, .registration select");
    const inputArray = [loginInput, registerInput, registrationInput];

    const registerMessages = document.querySelectorAll(".register .message");
    const loginMessages = document.querySelectorAll(".login .message");
    const registrationMessages = document.querySelectorAll(".registration .message");
    const messagesArray = [loginMessages, registerMessages, registrationMessages];

    // submit variable
    const submitButton = document.querySelectorAll("button[type=submit]");
  
    registerbutton.addEventListener("click", () => {
      box.classList.add("right-side");
    });
  
    loginbutton.addEventListener("click", () => {
      box.classList.remove("right-side");
    });

    const url_data = new URLSearchParams(window.location.search);
    if (url_data.has("sign-up")) {
      document.querySelector("#register").click();
    }

    submitButton.forEach((button, buttonIndex) => {
      button.addEventListener("click", () => {
        let validation = true;
        const messages = messagesArray[buttonIndex];
        const inputs = inputArray[buttonIndex];
  
        inputs.forEach((input, index) => {
          messages[index].innerHTML = "";
          if (!input.checkValidity()) {
            validation = false;
            messages[index].innerHTML = `<i class='fa symbol'>&#xf12a</i> ${input.validationMessage}`;
          }
        })

        if (validation) {
          http_request(button.value);
        }
      })
    })

    function http_request(action) {
      const xhr = new XMLHttpRequest;
      xhr.open("POST", "php/login.php");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      if (action == "Login") {
        xhr.send(`email=${loginInput[0].value}&password=${loginInput[1].value}&action=login`);
      }
      else if (action == "Register") {
        xhr.send(`email=${registerInput[0].value}&password=${registerInput[1].value}&action=register`);
      }
      else {
        xhr.send(`email=${registerInput[0].value}&password=${registerInput[1].value}&name=${registrationInput[0].value}&birth=${registrationInput[1].value}&gender=${registrationInput[2].value}&country=${registrationInput[3].value}&action=create account`);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText.includes("Login Success")) {
              alert(xhr.responseText);
              window.location.href = "main.html";
          }
          else if (xhr.responseText == "Login Fail") {
              alert(xhr.responseText);
          }
          else if (xhr.responseText == "Email Already Exist") {
            alert(xhr.responseText);
          }
          else if (xhr.responseText == "Register Success") {
            registration_box.style.display = "block";
            blur.style.opacity = "0.5";
            blur.style.pointerEvents = "none";
          }
          else if (xhr.responseText == "Account Created") {
            alert(xhr.responseText);
            window.location.reload();
          }
        }
      }
    }
})

