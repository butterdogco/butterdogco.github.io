/**
 * @typedef {Object} Card
 * @property {string} Name - The name of the card.
 * @property {string} Icon - The URL of the card's icon.
 * @property {string} Link - The URL the card links to.
 * @property {string} [Desc] - A description of the card (optional).
 * @property {string} [Removing] - The date the card will be removed (optional).
 * @property {string} [RemoveReason] - The reason the card is being removed (optional).
 * @property {string} [Added] - The date the card was added (optional).
 */
const cards = {
  ["home"]: [
    {
      Name: "Wikabedia",
      Desc: "a free encyclopedia",
      Icon: "img/icons/Wikabedia.png",
      Link: "https://wikabedia.b-dog.co"
    },
    {
      Name: "Applications",
      Desc: "our other applications",
      Icon: "img/icons/Apps.png",
      Link: "applications",
    },
    {
      Name: "About Us",
      Desc: "learn more about us and what we do",
      Icon: "img/team.png",
      Link: "about",
    },
  ],
  ["apps"]: [
    {
      Name: "wikabedia",
      Desc: "te worlds bestest free enceyeclopedia",
      Icon: "img/icons/Wikabedia.png",
      Link: "https://wikabedia.b-dog.co"
    },
    {
      Name: "butterTube",
      Desc: "bestest video platform on eart",
      Icon: "https://cdn.jsdelivr.net/gh/butterdogco/ButterTube@main/docs/img/buttertube-square.jpg",
      Link: "https://butterdogco.com/ButterTube/"
    },
    {
      Name: "butterFlix",
      Desc: "super 99.99% real epik movie",
      Icon: "img/icons/ButterFlix.png",
      Link: "https://sites.google.com/view/butter-flix/"
    },
    {
      Name: "bulu",
      Desc: "hours of ads wiht 30 secund movie brake",
      Icon: "img/icons/Bulu.png",
      Link: "https://sites.google.com/view/bulu/"
    },
    {
      Name: "butter+",
      Desc: "movie but wiht de plus",
      Icon: "img/icons/ButterPlus.png",
      Link: "https://sites.google.com/view/butterplus"
    },
    {
      Name: "butterfiy",
      Desc: "want brake from ad? more ad",
      Icon: "img/icons/Butterfy.png",
      Link: "https://sites.google.com/bsd48.org/buterfiy/"
    },
    {
      Name: "LEADERBOARD",
      Desc: "BSD CODE OF CONDUCT VIOLATION LEADERBOARD 🦅🇺🇲",
      Icon: "img/catipillar.jpg",
      Link: "https://butterdogceo.github.io/CODE-OF-CONDUCT-VIOLATION-LEADERBOARD/"
    },
    {
      Name: "butter webstore",
      Desc: "get teh new buter for ur computehr",
      Icon: "img/icons/Webstore.png",
      Link: "https://sites.google.com/view/butter-dog-search/apps/bdog-webstore/"
    },
    {
      Name: "bbay",
      Desc: "pay money for te thing you pay for",
      Icon: "img/icons/Bbay.png",
      Link: "https://sites.google.com/bsd48.org/bbay"
    },
    {
      Name: "butterOS",
      Desc: "da latest and greatest ting for ur computer",
      Icon: "img/icons/ButterOS.png",
      Link: "https://butterdogceo.github.io/ButterOS/"
    },
    {
      Name: "butterdonalds",
      Desc: "cheapest food for healthiest option 👍",
      Icon: "img/icons/ButterDonalds.png",
      Link: "https://butterdogco.com/ButterDonalds/",
      Added: "February 19, 2026"
    },
    {
      Name: "calculater",
      Desc: "realy smart computor taht do math",
      Icon: "img/icons/Calculator.jpeg",
      Link: "tools/calculator"
    }
  ],
};
