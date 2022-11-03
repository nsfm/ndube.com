import { Illustration, Anchor } from "react-zdog";
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

  for (let i = 1; i < 10; i++) {
    planets.push(
      <Planet
        key={i}
        diameter={randomRange(20, 60)}
        color="#886677"
        atmosphere={false}
        orbit={{
          period: randomRange(7000, 8000),
          offset: randomRange(0, TAU),
          distance: {
            apogee: randomRange(200, 400),
            perigee: randomRange(100, 400),
          },
        }}
      >
        {new Array(Math.floor(Math.random() * 10)).fill(0).map((val, j) => (
          <Planet
            key={`${i}.${j}`}
            diameter={randomRange(5, 10)}
            color="#886677"
            atmosphere={false}
            orbit={{
              period: randomRange(1000, 2000),
              offset: randomRange(0, TAU),
              distance: {
                apogee: randomRange(100, 200),
                perigee: randomRange(100, 200),
              },
            }}
          />
        ))}
      </Planet>
    );
  }

  console.log(planets);
  return (
    <Container>
      <Illustration dragRotate={true} element="svg" zoom={1}>
        <Anchor rotate={{ x: Math.PI / 3, y: Math.PI / 2, z: 0 }} stroke={0}>
          {planets}
        </Anchor>
      </Illustration>
    </Container>
  );
};
