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
  const randomGradientIndex = Math.floor(Math.random() * GRADIENTS.length);
  const svgImage = createSvg(
    WIDTH,
    HEIGHT,
    tspans,
    quoteAuthor,
    randomGradientIndex
  );

  // 4. select a random background image
  const backgroundImages = [
    "backgrounds/jason-leung.jpg",
    "backgrounds/magic-pattern.jpg",
    "backgrounds/pawel-czerwinski.jpg",
    "backgrounds/rodion-kutsaiev.jpg",
  ];
  const randomBackgroundIndex = Math.floor(
    Math.random() * backgroundImages.length
  );
  const selectedBackgroundImage = backgroundImages[randomBackgroundIndex];

  // 5. SVG + selected background image
  const svgBuffer = Buffer.from(svgImage);
  const imagePath = path.join("/tmp", "quote-card.png");
  const image = await sharp(selectedBackgroundImage)
    .composite([{ input: svgImage, top: 0, left: 0 }])
    .toFile(imagePath);
}
