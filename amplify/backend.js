const sharp = require("sharp");
const apiURL = "https://zenquotes.io/api/random";
const fetch = require("node-fetch");

const createSvg = require("./utils/createSvg");
const createTspanElements = require("./utils/createTspanElements");
const constants = require("./constants");

const {
  SVG_DIMENSIONS: { WIDTH, HEIGHT, LINE_BREAK },
  GRADIENTS,
} = constants;

// 1. fetch a random quote
async function getRandomQuote(apiURL) {
  // validate response
  const response = await fetch(apiURL);
  const data = await response.json();

  const [quote] = data;
  const quoteText = quote.q.split(" ");
  const quoteAuthor = quote.a;

  // 2. turn quote result into lines of text
  const tspans = createTspanElements(quoteText, LINE_BREAK);

  // 3. construct the SVG (add author, etc.)
  // https://symbl.cc | https://fffuel.co/gggrain | https://www.svgviewer.dev
  const randomGradient = Math.ceil(Math.random() * GRADIENTS.length);
  const svgImage = createSvg(
    WIDTH,
    HEIGHT,
    tspans,
    quoteAuthor,
    randomGradient
  );

  // 4. SVG --> image as png (/base64 in lambda)
  const imagePath = path.join("/tmp", "quote-card.png");

  console.log(svgImage);
}
