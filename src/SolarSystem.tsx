import Zdog from "zdog";
import React from "react";

import { Planet } from "./Planet";
import { randomRange } from "./Math";

/**
 * Manages the planets.
 */
export const SolarSystem = ({ selector }: { selector: string }) => {
  const cosmicBackground = new Zdog.Illustration({
    element: `#${selector}`,
    resize: true,
    dragRotate: true,
    zoom: 1,
  });

  const earth = Planet({
    parent: cosmicBackground,
    diameter: 180,
    atmosphere: {
      color: "#FFFFFF",
      radius: 10,
    },
  });

  const moons: { shape: Zdog.Shape; anchor: Zdog.Anchor }[] = [];

  for (let i = 0; i < 6; i++) {
    moons.push(
      Planet({
        parent:
          moons.length > 0
            ? Math.random() > 0.6 && i > 0
              ? earth.anchor
              : moons[Math.floor(Math.random() * moons.length)].anchor
            : earth.anchor,
        diameter: randomRange(5, 60),
        color: "#886677",
        orbit: {
          period: randomRange(7000, 8000),
          offset: randomRange(0, Zdog.TAU),
          distance: {
            apogee: randomRange(300, 600),
            perigee: randomRange(300, 600),
          },
        },
      })
    );
  }

  cosmicBackground.rotate.z = Zdog.TAU / 256;
  cosmicBackground.rotate.y = Zdog.TAU / 2;
  cosmicBackground.rotate.x = -Zdog.TAU / 32;

  const requestRef = React.useRef(0);
  const animate = () => {
    cosmicBackground.updateRenderGraph();
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return <div />;
};
