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

const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navBackdrop = document.getElementById('nav-backdrop');

// Hamburger toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    navBackdrop.classList.toggle('show');
});

// Close menu when clicking overlay or link
navBackdrop.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    navBackdrop.classList.remove('show');
}

// Active link highlight on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// === Education Timeline Animation ===
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.edu-timeline-item');
    const timelineTrack = document.querySelector('.edu-timeline-track');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => observer.observe(item));

    // Progress bar animation
    function updateProgress() {
        const section = document.getElementById('education');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let percent = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
            const visible = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
            percent = Math.max(0, Math.min(1, visible / rect.height));
        }
        if (timelineTrack) {
            if (percent > 0.1) timelineTrack.classList.add('progress');
            else timelineTrack.classList.remove('progress');
        }
    }
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
}

document.addEventListener('DOMContentLoaded', animateTimeline);

// === Animated Skills Grid ===
function animateSkillsGrid() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;

    // Add SVG circles dynamically
    skillItems.forEach(item => {
        const percent = parseInt(item.getAttribute('data-skill'), 10) || 0;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        circle.setAttribute('width', '72');
        circle.setAttribute('height', '72');
        circle.innerHTML = `
            <defs>
                <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF8C00"/>
                    <stop offset="100%" stop-color="#58A6FF"/>
                </linearGradient>
            </defs>
            <circle class="skill-bg" cx="36" cy="36" r="28" />
            <circle class="skill-bar" cx="36" cy="36" r="28" stroke-dasharray="176" stroke-dashoffset="176"/>
        `;
        const skillCircle = item.querySelector('.skill-circle');
        if (skillCircle && !skillCircle.querySelector('svg')) {
            skillCircle.appendChild(circle);
        }
    });

    // Animate on scroll
    function animateCircles() {
        skillItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < windowHeight - 40 && rect.bottom > 40) {
                const percent = parseInt(item.getAttribute('data-skill'), 10) || 0;
                const bar = item.querySelector('.skill-bar');
                if (bar) {
                    const offset = 176 - (176 * percent / 100);
                    bar.style.strokeDashoffset = offset;
                }
            }
        });
    }
    window.addEventListener('scroll', animateCircles);
    window.addEventListener('resize', animateCircles);
    animateCircles();
}

document.addEventListener('DOMContentLoaded', animateSkillsGrid);

// === Experience Carousel Parallax ===
function expCarouselParallax() {
    const cards = document.querySelectorAll('.exp-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 12;
            const rotateY = (x - centerX) / 12;
            card.style.transform = `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', expCarouselParallax);

// === Skills Tag Cloud Filtering ===
function skillsTagCloudFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tags = document.querySelectorAll('.skill-tag');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            tags.forEach(tag => {
                if (filter === 'all' || tag.classList.contains(filter)) {
                    tag.style.display = 'inline-block';
                } else {
                    tag.style.display = 'none';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', skillsTagCloudFilter);
