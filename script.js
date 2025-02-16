// Typing Effect
const words = ["Web Developer", "UI/UX Designer", "Coder"];
let i = 0;
let textPosition = 0;
let currentWord = "";
const speed = 150;

function typeEffect() {
    currentWord = words[i];
    document.querySelector(".typing-text").innerHTML = currentWord.substring(0, textPosition) + "|";

    if (textPosition++ < currentWord.length) {
        setTimeout(typeEffect, speed);
    } else {
        setTimeout(() => {
            textPosition = 0;
            i = (i + 1) % words.length;
            typeEffect();
        }, 1000);
    }
}

window.onload = typeEffect;

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
