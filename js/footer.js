function home () {
    const url = "main.html";
    window.location.href = url;
}

function course () {
    const url = "course.html";
    window.location.href = url;
}

function about () {
    const section = document.getElementById('scroll-here');
    if (section) {
        section.scrollIntoView({behavior: 'smooth'});
    }
    else {
        localStorage.about = true;
        window.location.href = "main.html";
    }
}

function tutor () {
    let url = "applytutor.html";
    if (!loginned) {
        alert("Please login to apply as tutor");
        url = "login.html";
    }
    window.location.href = url;
}

function donate () {
    const url = "donation.html";
    window.location.href = url;
}

function terms () {
    const url = "terms.html";
    window.location.href = url;
}

function privacy () {
    const url = "privacy.html";
    window.location.href = url;
}

function cookies () {
    const url = "cookies.html";
    window.location.href = url;
}

function liciences () {
    const url = "licenses.html";
    window.location.href = url;
}

function faq () {
    const url = "faq.html";
    window.location.href = url;
}

function public_policy () {
    const url = "publicpolicy.html";
    window.location.href = url;
}