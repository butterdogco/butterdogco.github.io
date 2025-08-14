// Card Creation
function createCard(cardInfo) {
  const cardName = cardInfo.Name || "";
  const cardDesc = cardInfo.Desc || "";
  const cardIcon = cardInfo.Icon || "img/butterdog.png";
  const cardLink = cardInfo.Link || "#";
  const cardAltLink = cardInfo.AltLink || null;
  const cardIsSecret = cardInfo.Secret || false;
  const cardIsDisabled = cardInfo.Disabled || false;

  if (cardIsDisabled) {
    return;
  }
  
  const div = document.createElement("div");
  div.classList.add("card");
  if (cardIsSecret) {
    div.classList.add("hidden");
  }
  const a = document.createElement("a");
  a.href = cardAltLink || cardLink;
  const img = document.createElement("img");
  img.src = cardIcon;
  img.setAttribute("loading", "lazy");
  const heading = document.createElement("h2");
  heading.innerText = cardName;
  const p = document.createElement("p");
  p.innerText = cardDesc;
  
  div.appendChild(a);
  a.appendChild(img);
  a.appendChild(heading);
  a.appendChild(p);
  document.getElementById("cards").appendChild(div);
}

try {
  const pageId = document.getElementById("pageID");
  if (!pageId) {
    throw new Error("Page ID element not found");
  }

  const fileName = pageId.innerHTML;
  cards[fileName].forEach(function(card) {
    createCard(card);
  });
} catch (err) {
  // Simply ignore (Page doesn't have cards)
}

// DVD Logo Funny
const funnyEnabled = true;
const funnyImages = [
  "https://w7.pngwing.com/pngs/626/579/png-transparent-blu-ray-disc-computer-icons-dvd-compact-disc-dvd-text-logo-desktop-wallpaper-thumbnail.png",
  "https://github.com/butterdogco/butterdogco.github.io/blob/main/docs/img/catipillar.jpg?raw=true",
  "https://upload.wikimedia.org/wikipedia/en/8/85/Bill_Nye_the_Science_Guy_title_screen.jpg",
  "https://raw.githubusercontent.com/butterdogco/butterdogco.github.io/main/docs/img/woah%20cat.jpg?raw=true",
  "https://raw.githubusercontent.com/butterdogco/butterdogco.github.io/main/docs/img/butterdog.png?raw=true"
];

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function createFunny() {
  funnyImages.forEach(function(image) {
    const img = document.createElement("img");
    img.classList.add("dvd");
    img.src = image;
    document.body.appendChild(img);
    
    function updatePosition() {
      const randomX = getRandomInt(0, screen.availWidth);
      const randomY = getRandomInt(0, screen.availHeight);
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

function playFunnySound() {
  const audio = new Audio("audio/this%20look%20like%20gaming%20area.mp3");
  audio.controls = true;
  document.head.appendChild(audio);
  audio.play();
}

let rotateNum = 0;
let musicStarted = false;
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