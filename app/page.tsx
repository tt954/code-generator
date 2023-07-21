"use client";

import { GradientBackground } from "./components/Background";
import {
  FixedBackgroundImage,
  RelativeBackgroundImage,
} from "./components/Image";

import Cloud from "./assets/cloud.png";
import Moon from "./assets/moon.png";

export default function Home() {
  return (
    <main>
      <GradientBackground>
        <RelativeBackgroundImage
          src={Cloud}
          alt="cloud from vecteezy"
          height="200"
        />
        <FixedBackgroundImage
          src={Moon}
          alt="moon from vecteezy"
          height="300"
        />
      </GradientBackground>
    </main>
  );
}
