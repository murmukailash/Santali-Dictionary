      // Highlight current link
let url = window.location.pathname;
let allLinks = document.querySelectorAll(".menu a");
let allmyLinks = document.querySelectorAll(".topnav a");

for (let i = 0; i < allLinks.length; i++) {
  // Compare the pathname of the current URL with the anchor's pathname
  if (url === allLinks[i].pathname) {
    allLinks[i].style.color = "white";
    allLinks[i].style.border = "solid white 1px";
  } else {
    allLinks[i].style.color = "white";
  }
}

for (let i = 0; i < allmyLinks.length; i++) {
  // Compare the pathname of the current URL with the anchor's pathname
  if (url === allmyLinks[i].pathname) {
    allmyLinks[i].style.color = "white";
    allmyLinks[i].style.backgroundColor = "green";
  }
}

function hamFunction(y) {
  var x = document.getElementById("myLinks");
  if (x.style.maxHeight) {
    x.style.maxHeight = null;
  } else {
    x.style.maxHeight = x.scrollHeight + "px";
  }
  y.classList.toggle("change");
}