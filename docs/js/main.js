const CARDS_CONTAINER = document.getElementById("cards");
const NAV = document.getElementById("nav");
const NAV_MOBILE_MENU_ICONS = document.querySelectorAll(".mobile-menu-icon");
const NAV_LOGO = document.getElementById("nav-logo");

let rotateNum = 0;
let musicStarted = false;
let footerLogoClicks = 0;

// Card creation function
// cardInfo attributes: Name, Desc?, Icon, Link, AltLink?, Secret?, Disabled?
function createCard(cardInfo) {
  const cardName = cardInfo.Name;
  const cardDesc = cardInfo.Desc;
  const cardIcon = cardInfo.Icon;
  const cardLink = cardInfo.Link;
  const cardAltLink = cardInfo.AltLink;
  const cardIsSecret = cardInfo.Secret || false;
  const cardIsDisabled = cardInfo.Disabled || false;
  const cardRemovingDate = cardInfo.Removing ? new Date(cardInfo.Removing) : null;
  const cardRemoveReason = cardInfo.RemoveReason || "No reason provided";
  const now = new Date();

  if (cardIsDisabled || !CARDS_CONTAINER || (cardRemovingDate && now > cardRemovingDate)) {
    return;
  }

  const card = document.createElement("a");
  card.classList.add("card");
  card.classList.toggle("hidden", cardIsSecret);
  card.href = cardAltLink || cardLink || "#";
  if (card.href != "#") {
    card.title = "Click to go to " + (cardLink || cardName);

    // We don't want to apply this if a link is a page of this repo
    // But we should still allow links that include butterdogco.com
    if (!(card.href.includes("://butterdogco.com") && card.href.split("/").length <= 4)) {
      // Create the "external link" icon
      const span = document.createElement("span");
      span.classList.add("material-symbols-rounded", "open-icon");
      span.innerHTML = "open_in_new";
      card.appendChild(span);
    }
  }
  if (cardIcon) {
    const img = document.createElement("img");
    img.src = cardIcon;
    img.setAttribute("loading", "lazy");
    img.setAttribute("alt", cardName + " icon");
    card.appendChild(img);
  }
  if (cardName) {
    const heading = document.createElement("h2");
    heading.innerText = cardName;
    card.appendChild(heading);
  }
  if (cardDesc) {
    const p = document.createElement("p");
    p.innerText = cardDesc;
    card.appendChild(p);
  }
  if (cardRemovingDate) { // No need to double check date as we already check at the start
    const span = document.createElement("span");
    span.classList.add("material-symbols-rounded", "removing-soon-icon");
    span.innerHTML = "schedule";
    span.title = `${cardName} is being removed on ${cardRemovingDate.toLocaleDateString()}${cardRemoveReason ? ' - ' + cardRemoveReason : ''}`;
    card.appendChild(span);
  }

  CARDS_CONTAINER.appendChild(card);
}

function initCards() {
  const pageIdElement = document.querySelector('meta[name="page-id"]');
  if (!pageIdElement) {
    return; // No page ID means no cards, so just return early
  }

  const pageId = pageIdElement.getAttribute("content");
  if (!pageId) {
    console.warn("Page ID meta tag is empty, cannot initialize cards.");
    return;
  }
  
  cards[pageId].forEach(function (cardInfo) {
    createCard(cardInfo);
  });
}

// DVD logo funny bouncing images
const funnyEnabled = true;
const funnyImages = [
  "./img/funny/dvd.png",
  "./img/catipillar.jpg",
  "./img/funny/bill_nye.jpg",
  "./img/funny/woah_cat.jpg",
  "./img/butterdog.png",
  "./img/funny/thumbs_up.jpg"
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
function toggleNav() {
  if (!NAV) {
    return;
  }

  NAV.classList.toggle("active");
}

// Plays the funny sound
function playFunnySound(src) {
  const audio = new Audio(src ? src : "audio/this%20look%20like%20gaming%20area.mp3");
  audio.controls = true;
  document.head.appendChild(audio);
  audio.play();
}

// I wonder when this runs
function navIconClick() {
  playFunnySound();
  createFunny();

  if (musicStarted === false) {
    musicStarted = true;
    const audio = new Audio("audio/dubstep.wav");
    document.head.appendChild(audio);
    audio.play();
  }

  rotateNum = rotateNum + 180;
  NAV_LOGO.style.rotate = `${rotateNum}deg`;
}

function setupNav() {
  if (!NAV || !NAV_MOBILE_MENU_ICONS || !NAV_LOGO) {
    return;
  }

  NAV_MOBILE_MENU_ICONS.forEach(icon => {
    icon.addEventListener("click", toggleNav);
  });

  NAV_LOGO.addEventListener("click", navIconClick);
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
      <img src="/img/general/ButterDogCo%20Wide%20Logo.png" alt="ButterDogCo Logo (Wide)" class="logo" loading="lazy">
    </section>
    <section class="links">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/applications">Apps</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <img src="/img/general/ButterDogCo%20Wide%20Logo.png" alt="ButterDogCo Logo (Wide)" class="logo" loading="lazy" tabindex="0" role="button" aria-label="Funny secret">
      <ul>
        <li><a href="/pp">Privacy Policy</a></li>
        <li><a href="/tos">Terms of Use</a></li>
      </ul>
    </section>
  `;
  const footerImage = footer.querySelectorAll('img.logo');
  footerImage.forEach(img => {
    img.addEventListener('click', footerLogoClick);
  });
  document.body.appendChild(footer);
}

initCards();
createFooter();
setupNav();
