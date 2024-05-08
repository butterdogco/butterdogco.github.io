// Menu Functions
function openMenu() {
  document.getElementById('nav').style.width = "98.5%";
  document.getElementById('closeMenuIcon').style.display = "block";
  document.getElementById('menuIcon').style.display = "none";
}

function closeMenu() {
  document.getElementById('nav').style.width = "225px";
  document.getElementById('menuIcon').style.display = "block";
  document.getElementById('closeMenuIcon').style.display = "none";
}

function iconClick() {
  document.getElementById('icon').style.rotate = "180deg";
}

// Alternate Site Detection
// ⚠ Modifying these functions violates ButterDogCo Terms of Service ⚠
const link = window.location.href;
if (!link.includes("https://b-dog.co")) {
  const item = document.createElement('a');
  const div = document.getElementById('nav');
  if (div) {
    item.innerText = "Important Info";
    item.href = "altsite";
    div.appendChild(item);

    if (link.includes("/altsite")) {
      item.href = "#";
      item.id = "active";
      const p = document.getElementById('altSiteInfoText');
      if (link.includes("https://butterdogceo.github.io") && p) {
        p.innerHTML = "This is an alternate website for ButterDogCo, the main website can be found <a href='https://b-dog.co'>here</a>.";
      } else if (p) {
        p.innerHTML = "This is an unofficial website for ButterDogCo. Please note that anything found here can be modified by the site host, the official website can be found <a href='https://b-dog.co'>here</a>.";
      }
    }
  }

  var things = document.querySelectorAll("a");
  var things_array = [...things];
  things_array.forEach(obj => {
    if (obj.getAttribute('data-alt-link')) {
        obj.href = obj.getAttribute('data-alt-link');
        obj.title = "Click to open alternate link";
    }
  });
} else if (link.includes("/altsite")) {
  window.location.href = "index";
}