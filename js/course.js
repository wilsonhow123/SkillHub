const courseContainer = document.querySelector(".course-container");
const pageNav = document.querySelector(".page-nav");
const categoriesList = document.querySelector(".categories-list");
let name_choice = null;
let categories_choice = null;
let duration_choice = null;
let pageNum = 1;
let page = 1;

document.addEventListener("DOMContentLoaded", () => {
    get_course(1);
    get_page();
    get_category();
})

// send request to get specific course
// display the course when receiving
function get_course (page_num) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `php/course.php?action=getCourse&page=${page_num}&nameChoice=${name_choice}&durationChoice=${duration_choice}&categoryChoice=${categories_choice}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    const res = JSON.parse(xhr.responseText);
                    while (courseContainer.firstChild) {
                        courseContainer.removeChild(courseContainer.firstChild);
                    }
                    if (Object.keys(res).length > 0) {
                        Object.keys(res).forEach((id) => {
                            const course = document.createElement("div");
                            course.className = "course"
                            course.onclick = courseDetails(id)
                            info = res[id]
                            html = `<div class="course-img">
                                        <img src="${info["Image_Path"].replace("\\", "")}" alt="${info["Image_Name"]}">
                                    </div>
                                    <div class="course-details">
                                        <div class="course-student">${info["Total_Participator"]} Students</div>
                                        <div class="course-duration">${info["Duration"]}m</div>
                                        <div class="course-title">${info["Course_Name"]}</div>
                                        <div class="course-lecturer">${info["Name"]}</div>
                                        <div class="course-bookmark" onclick="bookmark(event, this)"><i class="fa-regular fa-bookmark"></i></div>
                                    </div>`
                            course.innerHTML = html;
                            courseContainer.appendChild(course);
                        })
                    }
                    else {
                        const div = document.createElement("div");
                        div.className = "no-course";
                        div.innerHTML = "No Result";
                        courseContainer.appendChild(div);
                    }
                }
                catch {
                    console.error(xhr.responseText);
                }
            }
        }
    }
}

function get_page () {
    const xhr2 = new XMLHttpRequest(); // create interface object , state = 1
    xhr2.open("GET", `php/course.php?action=getMaxPage&nameChoice=${name_choice}&durationChoice=${duration_choice}&categoryChoice=${categories_choice}`); //define how to send and send to where
    xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // set header
    xhr2.send(); // state 2
    // state 3 when receive responses, state 4 when receive completed response
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4) {
            if (xhr2.status == 200) {
                while (pageNav.children.length > 1) {
                    pageNav.removeChild(pageNav.lastElementChild);
                }
                page = 1;
                pageNum = Math.ceil(xhr2.responseText/9);
                maxPage = (pageNum > 4) ?5 :pageNum // if > 4 then assign 5 else assign pageNum
                for (let i = 2; i <= maxPage; i++) {
                    const li = document.createElement("li");
                    li.innerHTML = i;
                    pageNav.appendChild(li);
                }
            }
        }
    }
}

function get_category () {
    const xhr3 = new XMLHttpRequest();
    xhr3.open("POST", "php/publish.php");
    xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr3.send("action=get category");

    xhr3.onreadystatechange = function () {
        if (xhr3.readyState == 4) {
            if (xhr3.status == 200) {
                // add those category into category option in publish box
                const category_array = JSON.parse(xhr3.responseText);
                Object.keys(category_array).forEach((category_id) => {
                    const div = document.createElement("div");
                    div.id = `category${category_id}`;
                    div.className = "category"
                    div.innerHTML = category_array[category_id];
                    div.onclick = categories_filter (category_id);
                    categoriesList.appendChild(div);
                })
            }
        }
    }
}

// control the interaction when swap to next or previous page
function changePage(num) {
    page += num;
    if (page > pageNum || page < 1) {
        page -= num;
    }
    else {
        const pageNavLi = document.querySelectorAll(".page-nav li");
        pageNavLi.forEach((li, index) => {
            if (index + page <= pageNum) {
                li.innerHTML = index + page;
            }
            else {
                li.innerHTML = "";
            }
        })
        get_course(page);
    }
}

function search_course () {
    if (event.target.value.length > 0) {
        name_choice = event.target.value;
    }
    else {
        name_choice = null;
    }
    get_course(1);
    get_page();

}

// filter the course and refresh it
function duration_click(clickedButton) {
    var icon = clickedButton.querySelector('i');
    
    var hasCheck = icon.classList.contains('fa-square-check');
    
    var durationFilters = document.querySelectorAll('.duration-filter');
    durationFilters.forEach((filter) => {
        var filterIcon = filter.querySelector('i');
        filterIcon.classList.remove('fa-square-check');
        filterIcon.classList.add('fa-square');
    });
    
    if (!hasCheck) {
        icon.classList.remove('fa-square');
        icon.classList.add('fa-square-check');
        duration_choice = clickedButton.id;
    }
    else {
        duration_choice = null;
    }
    get_course(1);
    get_page();
}

function categories_filter(id) {
    function wrapper() {
        const last_category_filter = document.querySelector(`#${categories_choice}`);
        if (event.target.className.includes("clicked")) {
            event.target.classList.toggle("clicked");
            categories_choice = null;
        }
        else {
            if (last_category_filter) {
                last_category_filter.classList.toggle("clicked");
            }
            event.target.classList.toggle("clicked");
            categories_choice = `category${id}`;
        }
        get_course(1)
        get_page();
    }
    return wrapper
}

// function difficulty(clickedButton) {
//     var icon = clickedButton.querySelector('i');
    
//     var hasCheck = icon.classList.contains('fa-square-check');
    
//     var difficultyFilters = document.querySelectorAll('.difficulty-filter');
//     difficultyFilters.forEach(function (filter) {
//         var filterIcon = filter.querySelector('i');
//         filterIcon.classList.remove('fa-square-check');
//         filterIcon.classList.add('fa-square');
//     });
    
//     if (!hasCheck) {
//         icon.classList.remove('fa-square');
//         icon.classList.add('fa-square-check');
//     }
// }


// control the interaction of duration filter
function toggleFilterOptions() {
    var filterOptions = document.querySelector('.filter-options');
    filterOptions.classList.toggle('hidden');

    var filterIcon = document.getElementById('filterIcon');
    if (filterOptions.classList.contains('hidden')) {
        filterIcon.classList.remove('fa-circle-chevron-down');
        filterIcon.classList.add('fa-circle-chevron-left');
    } else {
        filterIcon.classList.remove('fa-circle-chevron-left');
        filterIcon.classList.add('fa-circle-chevron-down');
    }
}

//
function courseDetails(id) {
    function wrapper () {
        const url = `coursedetails.html?courseId=${id}`
        window.location.href = url
    }
    return wrapper;
}

function bookmark(event, bookmarkElement) {
    event.stopPropagation();
    var bookmarkIcon = bookmarkElement.querySelector('i');
    bookmarkIcon.classList.toggle('fa-regular');
    bookmarkIcon.classList.toggle('fa-solid');
}
