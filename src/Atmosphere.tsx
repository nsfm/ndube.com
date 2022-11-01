import { Shape, Group } from "react-zdog";
import Color from "color";

export type AtmosphereProps = {
  color: string;
  radius: number;
  planetRadius: number;
};

export const Atmosphere = (props: AtmosphereProps) => {
  const { color, radius, planetRadius } = props;
  const steps = 5;
  const layers = [];

  for (let i = 0; i < steps; i++) {
    layers.push(
      <Shape
        key={i}
        stroke={planetRadius * 2 + radius - i}
        color={Color(color).fade(0.95).hsl().string()}
      />
    );
  }

  return <Group>{layers}</Group>;
};
