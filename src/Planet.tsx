import Zdog from "zdog";
import Color from "color";
import { useState, PropsWithChildren } from "react";
import { Shape, useRender } from "react-zdog";

import { pointOnEllipse } from "./Math";
import { AtmosphereProps, Atmosphere } from "./Atmosphere";

export type PlanetOrbit = {
  period: number;
  distance: { apogee: number; perigee: number } | number;
  offset: number;
};

export type PlanetProps = {
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

export const Planet = (props: PropsWithChildren<PlanetProps>) => {
  const { atmosphere, orbit, color, children } = props;
  const [diameter] = useState(props.diameter || 25);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useRender(() => {
    if (!orbit) return;
    const angle = getOrbitalAngle(orbit);
    setPosition(getOrbitalPosition(orbit, angle));
  });

  let fadeColor = color;
  if (orbit) {
    const angle = getOrbitalAngle(orbit);
    fadeColor = Color(props.color)
      .rotate(angle * (180 / Math.PI))
      .string();
  }

  return (
    <Shape translate={position} stroke={diameter} color={fadeColor}>
      {atmosphere ? (
        <Atmosphere
          color={atmosphere.color}
          steps={atmosphere.steps}
          diameter={atmosphere.diameter}
        />
      ) : (
        ""
      )}
      {children}
    </Shape>
  );
};
