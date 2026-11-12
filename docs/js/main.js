const CARDS_CONTAINER = document.getElementById("cards");
const NAV = document.getElementById("nav");
const NAV_MOBILE_MENU_ICONS = document.querySelectorAll(".mobile-menu-icon");
const NAV_LOGO = document.getElementById("nav-logo");
const SETTINGS_STORAGE_KEY = "settings-json";
const DEFAULT_SETTINGS = {
  dyslexia_mode: {
    name: 'Dyslexia Mode',
    description: 'Enhances text readibility by increasing all spacing related to text, designed for dyslexic users.',
    value: false,
    onChange: (value) => {
      document.body.classList.toggle('dyslexia-mode', value);
    }
  },
  // high_contrast_mode: {
  //   name: 'High Contrast Mode',
  //   description: 'Enhances overall contrast',
  //   value: false,
  //   onChange: (value) => {
  //     document.body.classList.toggle('high-contrast-mode', value);
  //   }
  // }
};
const FUNNY_ENABLED = true;
const FUNNY_IMAGES = [
  "./img/funny/dvd.png",
  "./img/catipillar.jpg",
  "./img/funny/bill_nye.jpg",
  "./img/funny/woah_cat.jpg",
  "./img/butterdog.png",
  "./img/funny/thumbs_up.jpg"
];

let settings = new Map();
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

    const isInternalLink = () => {
      try {
        const url = new URL(card.href, window.location.origin);
        return url.hostname === "butterdogco.com" && 
              url.pathname.split("/").length <= 4;
      } catch {
        return false;
      }
    };

    if (!isInternalLink()) {
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

// Utility function that gets a random number between the 2 ranges (no way really)
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// Creates the bouncing images and sets up an update loop for them
function createFunny() {
  FUNNY_IMAGES.forEach(function (image) {
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

function displayOptionsModal(name, options) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modalContainer');
  const closeModal = () => modalContainer.remove();
  modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer)
      closeModal();
  });

  const modal = document.createElement('modal');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header');

  const modalHeading = document.createElement('h2');
  modalHeading.innerText = name;
  modalHeader.append(modalHeading);

  const modalCloseButton = document.createElement('button');
  modalCloseButton.innerHTML = '&times;';
  modalCloseButton.classList.add('close');
  modalCloseButton.addEventListener('click', () => closeModal());
  modalHeader.append(modalCloseButton);

  modal.append(modalHeader);

  const modalSeperator = document.createElement('hr');
  modal.append(modalSeperator);

  const modalContentContainer = document.createElement('ul');

  for (const { name, description, value, onChange } of options) {
    const optionContainer = document.createElement('li');
    optionContainer.classList.add('option');

    const optionLabel = document.createElement('span');
    optionLabel.textContent = `${name}\n${description}`;
    optionContainer.append(optionLabel);

    const optionToggleSwitch = document.createElement('div');
    if (value === true) optionToggleSwitch.classList.add('checked');
    optionToggleSwitch.classList.add('switch');
    
    const optionToggleSwitchInput = document.createElement('input');
    optionToggleSwitchInput.type = 'checkbox';
    optionToggleSwitchInput.addEventListener('click', () => {
      const isChecked = optionToggleSwitchInput.checked;
      onChange(isChecked);
      optionToggleSwitch.classList.toggle('checked', isChecked);
    });
    if (value === true) optionToggleSwitchInput.checked = 'true';
    optionToggleSwitch.append(optionToggleSwitchInput);
    
    const optionToggleSwitchSlider = document.createElement('div');
    optionToggleSwitchSlider.classList.add('slider');
    optionToggleSwitch.append(optionToggleSwitchSlider);

    optionContainer.append(optionToggleSwitch);
    
    modalContentContainer.append(optionContainer);
  }

  modal.append(modalContentContainer);

  modalContainer.append(modal);

  document.body.append(modalContainer);
}

function footerLogoClick() {
  footerLogoClicks += 1;

  if (footerLogoClicks >= 5) {
    playFunnySound("audio/louie's pizza vocals.mp3");
    footerLogoClicks = 0;
  }
}

function setupFooter() {
  const footer = document.getElementById("footer");
  if (!footer) {
    console.warn("Footer element not found, skipping footer setup.");
    return;
  }

  const footerImage = footer.querySelectorAll('img.logo');
  footerImage.forEach(img => {
    img.addEventListener('click', footerLogoClick);
    img.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        footerLogoClick();
      }
    });
  });

  const footerButtonToggleAccessibilityPanel = footer.querySelector('#button-toggle-accessibility-panel');
  if (footerButtonToggleAccessibilityPanel) {
    footerButtonToggleAccessibilityPanel.addEventListener('click', () => {
      // Build options at runtime so we can ensure it's up to date
      let options = [];
      for (const [key, value] of settings.entries()) {
        const settingData = DEFAULT_SETTINGS[key];
        if (!settingData) {
          console.error('Failed to find setting data for:', key);
          continue;
        }

        let setting = Object.assign({}, settingData);
        setting.value = value;
        setting.onChange = (val) => changeSetting(key, val);
        options.push(setting);
      }

      displayOptionsModal('Accessibility', options);
    });
  }
}

function highlightHashElement() {
  const hash = window.location.hash;
  if (hash) {
    const element = document.getElementById(hash.substring(1));
    if (element) {
      if (element.classList.contains("highlight")) return; // Don't re-apply highlight if it's already highlighted
      
      element.classList.add("highlight");
      setTimeout(() => {
        element.classList.remove("highlight");
      }, 3000);
    }
  }
}

// If a hash is present in the URL, highlight the element with that ID
function setupHashHighlight() {
  highlightHashElement();

  // Also listen for hash changes after the page has loaded
  window.addEventListener("hashchange", highlightHashElement);
}

function getSavedSettings() {
  const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!savedSettings || savedSettings === '' || savedSettings === '{}') {
    return null;
  }

  try {
    return JSON.parse(savedSettings);
  } catch (err) {
    console.error('Failed to parse saved settings JSON:', err);
    return null;
  }
}

function loadSettings() {
  // Load default settings
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    settings.set(key, value.value);
  }

  const savedSettings = getSavedSettings();
  if (!savedSettings) {
    return;
  }

  // Load saved settings
  for (const [key, value] of Object.entries(savedSettings)) {
    const settingData = DEFAULT_SETTINGS[key];
    if (!settingData) {
      console.error('Failed to find setting data for:', key);
      continue;
    }

    settings.set(key, value);
    settingData.onChange(value);
  }
}

function saveSettings() {
  const savedSettings = getSavedSettings() || {};
  let changedSettings = new Map();
  
  for (const [key, value] of settings.entries()) {
    const defaultValue = DEFAULT_SETTINGS[key]?.value;
    if (defaultValue && defaultValue === value && (savedSettings[key] !== value)) {
      continue;
    }

    changedSettings.set(key, value);
  }

  if (changedSettings.size === 0) {
    console.log('No changed settings, skipping save');
    return;
  }

  try {
    const formattedSettings = JSON.stringify(Object.fromEntries(settings));
    localStorage.setItem(SETTINGS_STORAGE_KEY, formattedSettings);
  } catch (err) {
    console.error('Failed to format or save settings:', err);
  }
}

function changeSetting(key, value) {
  const settingData = DEFAULT_SETTINGS[key];
  if (settingData === null) {
    throw new Error(`Attempted to change non-existent setting "${key}"`);
  }

  const expectedFormat = typeof(settingData.value);
  if (value !== null && typeof(value) !== expectedFormat) {
    throw new Error(`Attempted to change setting "${key}" to ${value} with invalid type. Expected type: ${expectedFormat}`);
  }

  // If no value provided and setting value is boolean, invert it
  if (value === null && expectedFormat === 'boolean') {
    value = !(settings.get(key) || settingData.value);
  }

  settings.set(key, value);
  settingData.onChange(value);

  saveSettings();
}

document.addEventListener("DOMContentLoaded", () => {
  initCards();
  loadSettings();
  setupNav();
  setupFooter();
  setupHashHighlight();
});
