let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slides img");
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? "block" : "none";
    });
}

function nextSlide() {
    let slides = document.querySelectorAll(".slides img");
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides();
}

setInterval(nextSlide, 4000);

document.addEventListener("DOMContentLoaded", showSlides);
