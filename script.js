let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
const darkmode = document.getElementById("darkmode");
const tenderasaan = document.getElementById("tenderasaan");
const weather = document.getElementById("weather");
const workconnect = document.getElementById("workconnect");

tenderasaan.addEventListener("click", function () {
  window.open("https://www.tenderasaan.com/", "_blank");
});

weather.addEventListener("click", function () {
  window.open("https://github.com/nasarali03/Weather-Charts", "_blank");
});

workconnect.addEventListener("click", function () {
  window.open("https://github.com/nasarali03/work-connect", "_blank");
});

var typed = new Typed("#element", {
  strings: ["Backend Developer", "Agentic AI Developer"],
  typeSpeed: 55,
});

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.addEventListener("touchmove", function (event) {
  navbar.classList.remove("active");
  event.stopPropagation();
});

navbar.addEventListener("click", () => {
  navbar.classList.remove("active");
});

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
  const currentTheme = getThemePreference() || "light";
  applyTheme(currentTheme);
  // Now load your content here
  document.body.style.display = "block";
});
