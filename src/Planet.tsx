import Zdog from "zdog";
import Color from "color";
import { useState, Key } from "react";
import { Shape } from "react-zdog";

import { pointOnEllipse } from "./Math";
import { AtmosphereProps, Atmosphere } from "./Atmosphere";

export type PlanetOrbit = {
  period: number;
  distance: { apogee: number; perigee: number } | number;
  offset: number;
};

export type PlanetProps = {
  id?: Key;
  diameter?: number;
  atmosphere?: AtmosphereProps | false;
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

export const Planet = (props: PlanetProps) => {
  const { atmosphere, orbit, color } = props;
  const [diameter] = useState(props.diameter || 25);

  let fadeColor = color;
  let translate = { x: 0, y: 0 };
  if (orbit) {
    const angle = getOrbitalAngle(orbit);
    translate = getOrbitalPosition(orbit, angle);
    fadeColor = Color(props.color)
      .rotate(angle * (180 / Math.PI))
      .string();
  }

  return (
    <Shape translate={translate} stroke={diameter} color={fadeColor}>
      {atmosphere ? (
        <Atmosphere
          color={atmosphere.color}
          radius={atmosphere.radius}
          planetRadius={atmosphere.planetRadius}
        />
      ) : (
        ""
      )}
    </Shape>
  );
};
