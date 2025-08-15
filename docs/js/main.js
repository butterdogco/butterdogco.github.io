const cardsContainer = document.getElementById("cards");
const nav = document.getElementById("nav");

// Card creation function
// cardInfo attributes: Name, Desc?, Icon, Link, AltLink?, Secret?, Disabled?
function createCard(cardInfo) {
  const cardName = cardInfo.Name;
  const cardDesc = cardInfo.Desc;
  const cardIcon = cardInfo.Icon;
  const cardLink = cardInfo.Link || "#";
  const cardAltLink = cardInfo.AltLink;
  const cardIsSecret = cardInfo.Secret || false;
  const cardIsDisabled = cardInfo.Disabled || false;

  if (cardIsDisabled || !cardsContainer) {
    return;
  }
  
  const a = document.createElement("a");
  a.classList.add("card");
  a.classList.toggle("hidden", cardIsSecret);
  a.href = cardAltLink || cardLink || "#";
  if (a.href != "#" && a.href.includes("://")) {
    // Open in a new tab
    a.target = "_blank";
    // Create the "external link" icon
    const span = document.createElement("span");
    span.classList.add("material-symbols-rounded", "open-icon");
    span.innerHTML = "open_in_new";
    a.appendChild(span);
  }
  if (cardIcon) {
    const img = document.createElement("img");
    img.src = cardIcon;
    img.setAttribute("loading", "lazy");
    a.appendChild(img);
  }
  if (cardName) {
    const heading = document.createElement("h2");
    heading.innerText = cardName;
    a.appendChild(heading);
  }
  if (cardDesc) {
    const p = document.createElement("p");
    p.innerText = cardDesc;
    a.appendChild(p);
  }
  
  cardsContainer.appendChild(a);
}

try {
  const pageIdElement = document.querySelector('meta[name="page-id"]');
  if (!pageIdElement) {
    throw new Error("Page ID element not found");
  }

  const pageId = pageIdElement.getAttribute("content");
  if (!pageId) {
    throw new Error("Page ID element is missing content")
  }
  cards[pageId].forEach(function(cardInfo) {
    createCard(cardInfo);
  });
} catch (err) {
  console.error(err);
}

// DVD logo funny bouncing images
const funnyEnabled = true;
const funnyImages = [
  "https://w7.pngwing.com/pngs/626/579/png-transparent-blu-ray-disc-computer-icons-dvd-compact-disc-dvd-text-logo-desktop-wallpaper-thumbnail.png",
  "https://github.com/butterdogco/butterdogco.github.io/blob/main/docs/img/catipillar.jpg?raw=true",
  "https://upload.wikimedia.org/wikipedia/en/8/85/Bill_Nye_the_Science_Guy_title_screen.jpg",
  "https://raw.githubusercontent.com/butterdogco/butterdogco.github.io/main/docs/img/woah%20cat.jpg?raw=true",
  "https://raw.githubusercontent.com/butterdogco/butterdogco.github.io/main/docs/img/butterdog.png?raw=true"
];

// Utility function that gets a random number between the 2 ranges (no way really)
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// Creates the bouncing images and sets up an update loop for them
function createFunny() {
  funnyImages.forEach(function(image) {
    const img = document.createElement("img");
    img.classList.add("dvd");
    img.src = image;
    document.body.appendChild(img);
    
    function updatePosition() {
      const randomX = getRandomInt(-50, screen.availWidth);
      const randomY = getRandomInt(-50, screen.availHeight);
      const randomSomething = Math.random() * 500;
      img.style.left = `${randomX}px`;
      img.style.top = `${randomY}px`;
      img.style.width = `${randomSomething}px`;
      img.style.transform = `rotateX(${randomSomething}deg) rotateY(${randomSomething}deg) rotateZ(${randomSomething}deg)`;
      setTimeout(updatePosition, getRandomInt(10, 1000));
    }
    updatePosition();
  });
}

// Take a guess as to what this does
function toggleMenu() {
  if (nav) {
    nav.classList.toggle("active");
  }
}

// Plays the funny sound
function playFunnySound() {
  const audio = new Audio("audio/this%20look%20like%20gaming%20area.mp3");
  audio.controls = true;
  document.head.appendChild(audio);
  audio.play();
}

let rotateNum = 0;
let musicStarted = false;

// I wonder when this runs
function iconClick() {
  playFunnySound();
  createFunny();
  if (musicStarted === false) {
    musicStarted = true;
    const audio = new Audio("audio/dubstep.wav");
    document.head.appendChild(audio);
    audio.play();
  }
  rotateNum = rotateNum + 180;
  document.getElementById('icon').style.rotate = `${rotateNum}deg`;
}

// Alternate Site Detection
// ⚠ Modifying these functions violates ButterDogCo Terms of Service ⚠
const link = window.location.href;
if (!link.includes("https://butterdogco.com")) {
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
        p.innerHTML = "This is an alternate website for ButterDogCo, the main website can be found <a href='https://butterdogco.com'>here</a>.";
      } else if (p) {
        p.innerHTML = "This is an unofficial website for ButterDogCo. Please note that anything found here can be modified by the site host, the official website can be found <a href='https://butterdogco.com'>here</a>.";
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