import Zdog from "zdog";
import Color from "color";
import { useState } from "react";

import { pointOnEllipse } from "./Math";

export type PlanetAtmosphere = {
  color: string;
  radius: number;
};

export type PlanetOrbit = {
  period: number;
  distance: { apogee: number; perigee: number } | number;
  offset: number;
};

export type PlanetProps = {
  parent: Zdog.Anchor | Zdog.Illustration;
  diameter?: number;
  atmosphere?: PlanetAtmosphere;
  color?: string;
  orbit?: PlanetOrbit;
};

// Get coordinates on an ellipse at the specified angle
const getOrbitalPosition = (
  orbit: PlanetOrbit,
  angle: number
): { x: number; y: number } => {
  let perigee, apogee;
  if (typeof orbit.distance === "number") {
    perigee = orbit.distance;
    apogee = orbit.distance;
  } else {
    ({ perigee, apogee } = orbit.distance);
  }

  return pointOnEllipse(0, 0, apogee, perigee, orbit.offset, angle);
};

const getOrbitalAngle = (orbit: PlanetOrbit): number => {
  return Zdog.lerp(0, Zdog.TAU, (Date.now() % orbit.period) / orbit.period);
};

const renderPlanet = ({
  diameter,
  color,
  anchor,
  atmosphere,
}: {
  anchor: Zdog.Anchor;
  color: string;
  diameter: number;
  atmosphere?: PlanetAtmosphere;
}): Zdog.Shape => {
  const planet = new Zdog.Shape({
    addTo: anchor,
    stroke: diameter,
    color: color,
  });

  if (atmosphere) {
    const group = new Zdog.Group({
      addTo: anchor,
    });

    planet.copy({
      addTo: group,
      color: Color(atmosphere.color).fade(0.85).hsl().string(),
    });

    let steps = 5;
    for (let i = 0; i < steps; i++) {
      new Zdog.Shape({
        addTo: group,
        stroke: diameter + atmosphere.radius - i,
        color: Color(atmosphere.color).fade(0.95).hsl().string(),
      });
    }

    group.addChild(planet);
  }

  return planet;
};

export const Planet = (props: PlanetProps) => {
  const { parent } = props;
  const [diameter] = useState(props.diameter || 25);
  const [atmosphere] = useState(
    props.atmosphere || {
      color: "#FFFFFF",
      radius: 25,
    }
  );
  const [orbit] = useState(
    props.orbit || {
      period: 5000,
      distance: { apogee: 200, perigee: 400 },
      offset: Zdog.TAU,
    }
  );
  const angle = getOrbitalAngle(orbit);
  const translate = getOrbitalPosition(orbit, angle);

  const color = Color(props.color)
    .rotate(angle * (180 / Math.PI))
    .string();

  const anchor = new Zdog.Anchor({ addTo: parent, translate });
  const shape = renderPlanet({ anchor, diameter, color, atmosphere });

  return { shape, anchor };
};
