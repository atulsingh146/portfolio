const words = [...document.querySelectorAll(".circle-cloud span")];
const radius = 180;

function isOverlapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

const placedRects = [];

words.forEach(word => {
  const scale = Math.random() * 1.5 + 0.6;
  word.style.fontSize = `${10 + scale * 10}px`;
  word.style.opacity = 0;

  let placed = false;
  let attempts = 0;

  while (!placed && attempts < 50) {
    attempts++;
    const angle = Math.random() * Math.PI * 2;
    const distance = radius * (0.4 + Math.random() * 0.6);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    word.style.transform = `translate(${x}px, ${y}px) scale(1)`;

    const rect = word.getBoundingClientRect();
    const containerRect = document.querySelector('.circle-cloud').getBoundingClientRect();
    const relativeRect = {
      top: rect.top - containerRect.top,
      bottom: rect.bottom - containerRect.top,
      left: rect.left - containerRect.left,
      right: rect.right - containerRect.left,
    };

    const overlap = placedRects.some(r => isOverlapping(r, relativeRect));

    if (!overlap) {
      placedRects.push(relativeRect);
      placed = true;
    }
  }

  if (!placed) {
    const angle = Math.random() * Math.PI * 2;
    const distance = radius * (0.5 + Math.random() * 0.5);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    word.style.transform = `translate(${x}px, ${y}px) scale(1)`;
  }
});

words.forEach((word, i) => {
  gsap.to(word, {
    opacity: 1,
    delay: i * 0.25,
    duration: 0.7,
    ease: "back.out(1.7)",
    onComplete: () => {
      gsap.to(word, {
        scale: '+=0.3',
        yoyo: true,
        repeat: -1,
        duration: 1.5 + Math.random(),
        ease: "sine.inOut",
      });
    }
  });
});
const tl = gsap.timeline();

tl.from(".text h2, .text p", {
  x: -200,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
  stagger: 0.3,
  ease: "power2.out"
});
