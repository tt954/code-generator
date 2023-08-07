import { GRADIENTS } from "constants";

const createSvg = (
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
          <stop stop-color="${
            gradients[gradientType][1]
          }" stop-opacity="1"></stop>
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
        <rect width="100%" height="100%" fill="${
          gradients[gradientType][2]
        }"></rect>
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
          x="${width / 2}"
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
          font-weight="bold"
          fill="white"
          text-anchor="middle"
          padding="50px"
        >
          ${tspans}
          <tspan x="${width / 2}" dy="1.8em">
            - ${author}
          </tspan>
        </text>
      </g>
      <text
        x="${width / 2}" y="${height - 10}" 
        font-size="20px"
        font-family="Verdana"
        fill="white"
        text-anchor="middle"
        opacity="0.5"
      >
        Developed by @tt954 | Quotes from ZenQuotes.io
      </text>
    </svg>`;

export default createSvg;
