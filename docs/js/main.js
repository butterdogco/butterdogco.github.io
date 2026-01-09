const cardsContainer = document.getElementById("cards");
const nav = document.getElementById("nav");

let rotateNum = 0;
let musicStarted = false;
let footerLogoClicks = 0;

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
  if (a.href != "#") {
    a.title = "Click to open " + cardName;

    // We don't want to apply this if a link is a page of this repo
    // But we should still allow links that include butterdogco.com
    if (!(a.href.includes("://butterdogco.com") && a.href.split("/").length <= 4)) {
      // Create the "external link" icon
      const span = document.createElement("span");
      span.classList.add("material-symbols-rounded", "open-icon");
      span.innerHTML = "open_in_new";
      a.appendChild(span);
    }
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
  cards[pageId].forEach(function (cardInfo) {
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
  "https://raw.githubusercontent.com/butterdogco/butterdogco.github.io/main/docs/img/butterdog.png?raw=true",
  "https://raw.githubusercontent.com/butterdogco/butterdogco.github.io/main/docs/img/stock/thumbs-up.jpg?raw=true"
];

// Utility function that gets a random number between the 2 ranges (no way really)
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// Creates the bouncing images and sets up an update loop for them
function createFunny() {
  funnyImages.forEach(function (image) {
    const img = document.createElement("img");
    img.classList.add("dvd");
    img.src = image;
    document.body.appendChild(img);
    document.body.classList.add("funny");

    function updatePosition() {
      const randomX = getRandomInt(-400, screen.availWidth - 200);
      const randomY = getRandomInt(-400, screen.availHeight - 50);
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
function playFunnySound(src) {
  const audio = new Audio(src ? src : "audio/this%20look%20like%20gaming%20area.mp3");
  audio.controls = true;
  document.head.appendChild(audio);
  audio.play();
}

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

function footerLogoClick() {
  footerLogoClicks += 1;

  if (footerLogoClicks >= 5) {
    playFunnySound("audio/louie's pizza vocals.mp3");
    footerLogoClicks = 0;
  }
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <section class="logo">
      <img src="img/general/ButterDogCo%20Wide%20Logo.png" alt="ButterDogCo Logo (Wide)" class="logo" loading="lazy">
    </section>
    <section class="links">
      <ul>
        <li><a href="./">Home</a></li>
        <li><a href="applications">Apps</a></li>
        <li><a href="news">News</a></li>
        <li><a href="about">About</a></li>
      </ul>
      <img src="img/general/ButterDogCo%20Wide%20Logo.png" alt="ButterDogCo Logo (Wide)" class="logo" loading="lazy">
      <ul>
        <li><a href="pp">Privacy Policy</a></li>
        <li><a href="tos">Terms of Use</a></li>
      </ul>
    </section>
  `;
  const footerImage = footer.querySelectorAll('img.logo');
  footerImage.forEach(img => {
    img.addEventListener('click', footerLogoClick);
  });
  document.body.appendChild(footer);
}

createFooter();
