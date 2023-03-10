import { Shape, Group } from "react-zdog";
import Color from "color";

export interface AtmosphereProps {
  color: string;
  diameter: number;
  steps?: number;
}

export const Atmosphere = (props: AtmosphereProps) => {
  const { color, diameter } = props;
  const steps = props.steps ?? 20;

  const layers = [];
  for (let i = 1; i < steps; i++) {
    layers.push(
      <Shape
        key={i}
        stroke={0.6 * diameter + 0.4 * diameter * (i / steps)}
        color={Color(color)
          .fade(0.8 + 0.2 * (i / steps))
          .hsl()
          .string()}
      />
    );
  }

  return <Group>{layers}</Group>;
};
