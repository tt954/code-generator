const sharp = require("sharp");
const apiURL = "https://zenquotes.io/api/random";
const fetch = require("node-fetch");

const WIDTH = 750;
const HEIGHT = 483;
const LINE_BREAK = 4;

const gradients = {
  1: ["hsl(194, 83%, 49%)", "hsl(227, 100%, 50%)", "hsl(0, 100%, 60%)"],
  2: ["hsla(261, 94%, 54%, 1.00)", "hsl(272, 99%, 54%)", "hsl(304, 91%, 55%)"],
  3: ["hsla(89, 37%, 58%, 1.00)", "hsl(37, 91%, 55%)", "hsl(212, 72%, 59%)"],
};

const createSVGElement = (
  width,
  height,
  tspans,
  author,
  gradientType
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient
          gradientTransform="rotate(-65, 0.5, 0.5)"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="gggrain-gradient2"
        >
          <stop
            stop-color="${gradients[gradientType][0]}"
            stop-opacity="1"
            offset="-0%"
          ></stop>
          <stop
            stop-color="rgba(255,255,255,0)"
            stop-opacity="0"
            offset="100%"
          ></stop>
        </linearGradient>
        <linearGradient
          gradientTransform="rotate(65, 0.5, 0.5)"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="gggrain-gradient3"
        >
          <stop stop-color="${gradients[gradientType][1]}" stop-opacity="1"></stop>
          <stop
            stop-color="rgba(255,255,255,0)"
            stop-opacity="0"
            offset="100%"
          ></stop>
        </linearGradient>
        <filter
          id="gggrain-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.64"
            numOctaves="2"
            seed="2"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>
          <feColorMatrix
            type="saturate"
            values="0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            result="colormatrix"
          ></feColorMatrix>
          <feComponentTransfer
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="colormatrix"
            result="componentTransfer"
          >
            <feFuncR type="linear" slope="3"></feFuncR>
            <feFuncG type="linear" slope="3"></feFuncG>
            <feFuncB type="linear" slope="3"></feFuncB>
          </feComponentTransfer>
          <feColorMatrix
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="componentTransfer"
            result="colormatrix2"
            type="matrix"
            values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 22 -14"
          ></feColorMatrix>
        </filter>
      </defs>
  
      <g>
        <rect width="100%" height="100%" fill="${gradients[gradientType][2]}"></rect>
        <rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect>
        <rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect>
        <rect
          width="100%"
          height="100%"
          fill="transparent"
          filter="url(#gggrain-filter)"
          opacity="0.8"
          style="mix-blend-mode: soft-light"
        ></rect>
        <text
          x="382"
          y="190"
          dy="70"
          text-anchor="middle"
          font-size="150"
          font-family="Times"
          fill="white"
        >
          ”
        </text>
        <text
          x="375"
          y="225"
          font-size="35"
          font-family="Verdana"
          fill="white"
          text-anchor="middle"
        >
          ${tspans}
          <tspan x="375" dy="1.8em">
            ${author}
          </tspan>
        </text>
      </g>
    </svg>`;

function createTspanElements(words) {
  if (words.length === 0) return "";

  const currentTspan = words.slice(0, LINE_BREAK).join(" ");
  const remainingWords = words.slice(LINE_BREAK);

  return (
    `<tspan x="${WIDTH / 2}" dy="1.2em">${currentTspan}</tspan>` +
    createTspanElements(remainingWords)
  );
}

// 1. fetch a random quote
async function getRandomQuote(apiURL) {
  // validate response
  const response = await fetch(apiURL);
  const data = await response.json();

  const [quote] = data;
  const quoteText = quote.q.split(" ");
  const quoteAuthor = quote.a;

  const tspans = createTspanElements(quoteText);
  // construct the SVG
  // https://symbl.cc | https://fffuel.co/gggrain/
  const svgImage = createSVGElement(
    WIDTH,
    HEIGHT,
    tspans,
    quoteAuthor,
    Math.ceil(Math.random() * 3)
  );

  console.log(svgImage);
}

// 2. turn result into lines of text
// 3. turn result of author into its own line
// 4. add quote image background (750px)
// generate final images
// 5. turn these elements --> SVG
// 6. SVG --> image as png (/base64 in lambda)

getRandomQuote(apiURL);
