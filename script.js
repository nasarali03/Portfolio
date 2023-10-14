let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
const game = document.getElementById("game");
const blog = document.getElementById("blog");
const chatgp = document.getElementById("chagpt");

game.addEventListener("click", function () {
  window.open("https://github.com/nasarali03/Lugx-Games-Store", "_blank");
});
blog.addEventListener("click", function () {
  window.open("https://github.com/nasarali03/Flask-Blog-Hub", "_blank");
});
chatgpt.addEventListener("click", function () {
  window.open(
    "https://github.com/nasarali03/Chatgpt-clone-with-voice-input",
    "_blank"
  );
});

var typed = new Typed("#element", {
  strings: ["Web Developer", "Backened Developer", "Python Developer"],
  typeSpeed: 50,
});

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

// Dark Mode / light mode
// let darkmode = document.querySelector("#darkmode");

// darkmode.onclick = () => {
//   if (darkmode.classList.contains("bx-sun")) {
//     darkmode.classList.replace("bx-sun", "bx-moon");
//     document.body.classList.add("active");
//   } else {
//     darkmode.classList.replace("bx-moon", "bx-sun");
//     document.body.classList.remove("active");
//   }
// };

// Function to set the theme preference in local storage
function setThemePreference(theme) {
  localStorage.setItem("theme", theme);
}

// Function to retrieve the theme preference from local storage
function getThemePreference() {
  return localStorage.getItem("theme");
}

// Function to apply the theme
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("active");
    darkmode.classList.replace("bx-sun", "bx-moon");
  } else {
    document.body.classList.remove("active");
    darkmode.classList.replace("bx-moon", "bx-sun");
  }
}

// Event handler for theme toggle
darkmode.onclick = () => {
  let currentTheme = getThemePreference();
  if (currentTheme === "dark") {
    currentTheme = "light";
  } else {
    currentTheme = "dark";
  }
  setThemePreference(currentTheme);
  applyTheme(currentTheme);
};

// Apply the theme on page load and then load the content
document.addEventListener("DOMContentLoaded", function () {
  const currentTheme = getThemePreference() || "dark"; // Default to 'light' if no preference is found
  applyTheme(currentTheme);
  // Now load your content here
  document.body.style.display = "block";
});
