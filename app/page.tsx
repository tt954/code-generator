"use client";

import { useState } from "react";

import { GradientBackground } from "./components/Background";
import {
  FixedBackgroundImage,
  RelativeBackgroundImage,
} from "./components/Image";
import { Footer, FooterLink } from "./components/Footer";

import Cloud from "./assets/cloud.png";
import Moon from "./assets/moon.png";

export default function Home() {
  const [numQuotes, setNumQuotes] = useState<Number | null>(0);

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
          height="500"
        />

        <Footer>
          <>
            total quotes generated: {numQuotes}
            <br />
            developed with ♥ by{" "}
            <FooterLink
              href="https://github.com/tt954"
              target="_blank"
              rel="noopener noreferrer"
            >
              @tt954
            </FooterLink>
          </>
        </Footer>
      </GradientBackground>
    </main>
  );
}
