/**
 * @param  x X origin offset
 * @param  y Y origin offset
 * @param  major First ellipse diameter
 * @param  minor The other ellipse diameter
 * @param  angle The angle to intercept the ellipse with
 * @returns  X and Y coordinates
 */
export const pointOnEllipse = (
  x: number,
  y: number,
  major: number,
  minor: number,
  rotation: number,
  angle: number
): { x: number; y: number } => {
  return {
    x:
      major * Math.cos(angle) * Math.cos(rotation) -
      minor * Math.sin(angle) * Math.sin(rotation) +
      x,
    y:
      major * Math.cos(angle) * Math.sin(rotation) +
      minor * Math.sin(angle) * Math.cos(rotation) +
      y,
  };
};

// Get random value in provided range
export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
