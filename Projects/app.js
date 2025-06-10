const projects = [
  {
    title: "Movie-Search-App",
    shortDesc: "Real-time movie search app using useState and useEffect for API data and rendering.",
    longDesc: "A real-time movie search app using React, useState for managing input/results, and useEffect to fetch and display data from an external movie API.",
    img: '../Images/moviesearch.png',
    link: "https://movie-search-app-tau-ebon.vercel.app/",
    tech: "HTML, CSS, JS, React, API"
  },
  {
    title: "Weather App",
    shortDesc: "Real-time weather updates with API integration.",
    longDesc: "A Weather Widget in React fetches real-time weather data from an API like OpenWeatherMap.Enter a city name, and the app displays temperature, condition, and humidity using `useState` and `useEffect`. It features a simple CSS,and event handling.",
    img: '../Images/weatherapp.png',
    link: "https://weather-widget-topaz-nu.vercel.app",
    tech: "JavaScript, OpenWeather API, CSS, React"
  },
  {
    title: "Form Handler App",
    shortDesc: "Handles form input, validation, and submission.",
    longDesc: "A multi-step form showcasing lifted state, conditional rendering, and reusable components to manage step-wise form flows in React applications.",
    img: '../Images/formhandler.png',
    link: "https://form-handler-neon.vercel.app/",
    tech: "HTML, CSS, JS, React"
  },
  {
    title: "Multi-Step Form Component",
    shortDesc: "Multi-step form with lifted state and flow control.",
    longDesc: "A front-end e-commerce layout demo with product cards, cart functionality, and responsive design. This project focuses on UI/UX and layout structuring.",
    img: '../Images/multistepform.png',
    link: "https://multi-step-form-three-rho.vercel.app/",
    tech: "HTML, CSS, JavaScript, React"
  },
  {
    title: "Todo List App",
    shortDesc: "Todo app with task state and filtering.",
    longDesc: "A todo list app using useState and props to manage, display, and filter tasks based on their completion status in React.",
    img: '../Images/todolist.png',
    link: "https://todo-list-rose-seven.vercel.app/",
    tech: "HTML, CSS, JS, React"
  },
  {
    title: "Theme Toggle App",
    shortDesc: "Theme toggle using useState and dynamic styling.",
    longDesc: "A theme toggle app using useState and conditional rendering to switch themes, showcasing interactive UI and state-driven style changes.",
    img: '../Images/toggletheme.png',
    link: "https://light-dark-theme-toggle-4bqo.vercel.app/",
    tech: "HTML, CSS, JS, React"
  }
];

const cardRow = document.getElementById("cardRow");
const contentText = document.getElementById("contentText");
const projectTitle = document.getElementById("projectTitle");
const projectDesc = document.getElementById("projectDesc");
const projectLink = document.getElementById("projectLink");
const projectTech = document.getElementById("projectTech");

let selectedIndex = null;

// Create project cards and append to cardRow
projects.forEach((project, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.index = index;

  card.innerHTML = `
    <img src="${project.img}" alt="${project.title}" />
    <div class="basic-info">
      <h3 style="color: #00ffaa; margin-bottom: 10px;">${project.title}</h3>
      <p>${project.shortDesc}</p>
    </div>
  `;

  cardRow.appendChild(card);

  card.addEventListener("click", () => {
    if (selectedIndex === index) {
      deselectProject();
    } else {
      selectProject(index);
    }
  });
});

// Animate cards one by one on page load
gsap.set(".card", { opacity: 0, y: 20 });
gsap.to(".card", {
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.75,
  ease: "power3.out",
});

// GSAP scale animation helper
function animateScale(element, scale) {
  gsap.to(element, { scale: scale, duration: 0.4 });
}

function selectProject(index) {
  selectedIndex = index;
  updateUI();
}

function deselectProject() {
  selectedIndex = null;
  updateUI();
}

function updateUI() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, idx) => {
    if (selectedIndex !== null) {
      if (idx === selectedIndex) {
        animateScale(card, 1.05);
        card.classList.remove("blur");
      } else {
        animateScale(card, 1);
        card.classList.add("blur");
      }
    } else {
      animateScale(card, 1);
      card.classList.remove("blur");
    }
  });

  if (selectedIndex !== null) {
    const project = projects[selectedIndex];
    projectTitle.textContent = project.title;
    projectDesc.textContent = project.longDesc;
    projectLink.href = project.link;
    projectTech.textContent = `Tech: ${project.tech}`;

    contentText.style.display = "block";
    gsap.fromTo(
      contentText,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    document.querySelector(".wrapper").style.alignItems = "center";
  } else {
    contentText.style.display = "none";
    document.querySelector(".wrapper").style.alignItems = "flex-start";
  }
}

// Drag to scroll logic
let isDragging = false;
let startX;
let scrollLeft;

cardRow.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - cardRow.offsetLeft;
  scrollLeft = cardRow.scrollLeft;
  cardRow.style.cursor = "grabbing";
});
cardRow.addEventListener("mouseleave", () => {
  isDragging = false;
  cardRow.style.cursor = "grab";
});
cardRow.addEventListener("mouseup", () => {
  isDragging = false;
  cardRow.style.cursor = "grab";
});
cardRow.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - cardRow.offsetLeft;
  const walk = (x - startX) * 2;
  cardRow.scrollLeft = scrollLeft - walk;
});
