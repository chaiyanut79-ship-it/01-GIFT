let current = 0;
const pages = document.querySelectorAll(".page");

function next() {
    if (current < pages.length - 1) {
        pages[current].classList.remove("active");
        current++;
        pages[current].classList.add("active");
    }
}