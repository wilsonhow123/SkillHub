const inputText = document.querySelectorAll(".container form input[type=text]");
const messages = document.querySelectorAll(".container form .message");
const submitBtn = document.querySelector(".container form input[type=button]");

submitBtn.addEventListener("click", () => {
    let validation = true;
    messages.forEach((message) => {
        message.innerHTML = "";
    })
    inputText.forEach((input, index) => {
        if(!input.checkValidity()) {
            validation = false;
            messages[index].innerHTML = `<i class='fa symbol'>&#xf12a</i> ${input.validationMessage}`;
        }
    })
    if (validation) {
        let form = new FormData(document.querySelector("form"));
        form.set("action", "apply");
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/request.php");
        xhr.send(form);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText == "apply success") {
                        messages.forEach((message, index) => {
                            inputText[index].value = "";
                            message.innerHTML = "";
                        })
                        alert("Your request have been submitted");
                    }
                    else {
                        alert("Apply fail");
                    }
                }
            }
        }   
    }
})
