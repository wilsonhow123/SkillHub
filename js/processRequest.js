let statusBox;
const table = document.querySelector("table");

function approveOrReject (decision, requestId, data) {
    function wrapper() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/request.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(`action=updateStatus&status=${decision}&id=${requestId}`);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data.innerHTML = decision;
                }
            }
        }
    }
    return wrapper;
}

document.addEventListener("DOMContentLoaded", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/request.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("action=getRequest");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const res = JSON.parse(xhr.responseText);
                if (res) {
                    Object.keys(res).forEach((key) => {
                        const row = document.createElement("tr");
                        Object.keys(res[key]).forEach((requestData) => {
                            const data = document.createElement("td");
                            data.innerHTML = res[key][requestData];
                            row.appendChild(data);
                            if (requestData == "Request_Status") {
                                statusBox = data;
                            }
                        })
                        Array.from(["Approve", "Reject"]).forEach((decision) => {
                            const data = document.createElement("td");
                            const btn = document.createElement("button");
                            btn.className = decision;
                            btn.innerHTML = decision;
                            data.appendChild(btn);
                            row.appendChild(data);
                            btn.onclick = approveOrReject (decision, key, statusBox);
                        })
                        table.appendChild(row);
                    })
                }
            }
        }
    }
})

