import { Illustration, Group } from "react-zdog";
import styled from "styled-components";
import { TAU } from "zdog";

import { Planet } from "./Planet";
import { randomRange } from "./Math";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  cursor: move;
`;

/**
 * Manages the planets.
 */
export const SolarSystem = () => {
  const planets = [
    <Planet
      key={0}
      color="#FFFFFF"
      diameter={180}
      atmosphere={{
        color: "#FFFFFF",
        radius: 20,
        planetRadius: 90,
      }}
    />,
  ];

  for (let i = 1; i < 6; i++) {
    planets.push(
      <Planet
        key={i}
        diameter={randomRange(5, 60)}
        color="#886677"
        atmosphere={false}
        orbit={{
          period: randomRange(7000, 8000),
          offset: randomRange(0, TAU),
          distance: {
            apogee: randomRange(300, 600),
            perigee: randomRange(300, 600),
          },
        }}
      />
    );
  }

  console.log(planets);
  return (
    <Container>
      <Illustration dragRotate={true} element="svg" zoom={1}>
        {planets}
      </Illustration>
    </Container>
  );
};
/*
 *
        <Group
          rotate={{ x: -Zdog.TAU / 32, y: Zdog.TAU / 2, z: Zdog.TAU / 256 }}
        >
        */
