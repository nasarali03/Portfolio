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
  strings: ["Web Developer", "Backened Developer"],
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
let darkmode = document.querySelector("#darkmode");

darkmode.onclick = () => {
  if (darkmode.classList.contains("bx-moon")) {
    darkmode.classList.replace("bx-moon", "bx-sun");
    document.body.classList.add("active");
  } else {
    darkmode.classList.replace("bx-sun", "bx-moon");
    document.body.classList.remove("active");
  }
};
