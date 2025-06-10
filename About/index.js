// GSAP Timeline animation for text entrance
const tl = gsap.timeline();
tl.from("h1, h2, p", {
  x: -500,
  opacity: 0,
  delay: 0.6,
  duration: 0.7,
  stagger: 0.4,
});

// Typing text effect
const words = ["Frontend Developer", "React Developer", "Coder"];
const changingText = document.getElementById("changing-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 200;
let pauseTime = 1100;

function typeEffect() {
  const currentWord = words[wordIndex];
  const visibleText = currentWord.substring(0, charIndex);
  changingText.textContent = visibleText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, typingSpeed / 2);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, typingSpeed);
    }
  }
}

typeEffect(); // Start the typing effect