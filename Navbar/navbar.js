fetch('../Navbar/navbar.html')
  .then(response => response.text())
  .then(data => {
    // Insert navbar HTML into body
    document.body.insertAdjacentHTML('afterbegin', data);

    // GSAP animations after HTML insertion
    const tl = gsap.timeline();

    tl.from("#nav h3, #nav2 a, #nav2 label", {
      y: -50,
      opacity: 0,
      delay: 0.2,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    });

    tl.from(".icon-link", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: -1.2,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Automatically highlight active nav link
    const links = document.querySelectorAll("#nav2 a");
    const currentURL = window.location.href;

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && currentURL.includes(href.replace("../", "").replace("index.html", ""))) {
        link.classList.add("active");
      }
    });
  });
