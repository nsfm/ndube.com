import { Component } from "react";
import Zdog from "zdog";
import Color from "color";
import "./SolarSystem.css";

/**
 * @param {number} x X origin offset
 * @param {number} y Y origin offset
 * @param {number} major First ellipse diameter
 * @param {number} minor The other ellipse diameter
 * @param {number} angle The angle to intercept the ellipse with
 * @returns {object} X and Y coordinates
 */
function pointOnEllipse(x, y, major, minor, rotation, angle) {
  return {
    x:
      major * Math.cos(angle) * Math.cos(rotation) -
      minor * Math.sin(angle) * Math.sin(rotation) +
      x,
    y:
      major * Math.cos(angle) * Math.sin(rotation) +
      minor * Math.sin(angle) * Math.cos(rotation) +
      y
  };
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Planet {
  constructor({
    parent = null,
    diameter = 25,
    atmosphere = {
      color: "#FFFFFF",
      radius: 25
    },
    color = "#000099",
    orbit = {
      period: 5000,
      distance: { apogee: 200, perigee: 400 },
      offset: Zdog.TAU
    }
  }) {
    this.parent = parent;
    this.orbit = orbit;
    this.atmosphere = atmosphere;
    this.diameter = diameter;
    this.color = color;

    this.moons = [];
    this.anchor = new Zdog.Anchor({ addTo: this.parent });
    this.model = this.generateModel();
  }

  generateModel() {
    const planet = new Zdog.Shape({
      addTo: this.anchor,
      stroke: this.diameter,
      color: this.color
    });

    if (this.atmosphere) {
      const group = new Zdog.Group({
        addTo: this.anchor
      });

      planet.copy({
        addTo: group,
        color: Color(this.atmosphere.color)
          .fade(0.85)
          .hsl()
          .string()
      });

      let steps = 5;
      for (let i = 0; i < steps; i++) {
        new Zdog.Shape({
          addTo: group,
          stroke: this.diameter + this.atmosphere.radius - i,
          color: Color(this.atmosphere.color)
            .fade(0.95)
            .hsl()
            .string()
        });
      }

      group.addChild(planet);
    }

    return planet;
  }

  // TODO: Color.rotate with orbital angle?

  getRandomMoon() {
    if (this.moons.length < 1) return this.anchor;
    return this.moons[Math.floor(Math.random() * this.moons.length)].anchor;
  }

  getOrbitalAngle() {
    const angle = Zdog.lerp(
      0,
      Zdog.TAU,
      (Date.now() % this.orbit.period) / this.orbit.period
    );
    this.model.color = Color(this.color).rotate(angle * (180 / Math.PI));
    return angle;
  }

  getOrbitalPosition() {
    let perigee, apogee;
    if (typeof this.orbit.distance === "number") {
      perigee = this.orbit.distance;
      apogee = this.orbit.distance;
    } else {
      ({ perigee, apogee } = this.orbit.distance);
    }

    return pointOnEllipse(
      0,
      0,
      apogee,
      perigee,
      this.orbit.offset,
      this.getOrbitalAngle()
    );
  }

  updatePosition() {
    if (this.orbit) {
      const { x, y } = this.getOrbitalPosition();
      this.anchor.translate.x = x;
      this.anchor.translate.z = y;
    }
  }

  animate() {
    this.updatePosition();
    this.moons.forEach(moon => moon.updatePosition());
  }
}

/**
 * Manages the planets.
 */
class SolarSystem {
  constructor() {
    this.selector = "#solarsystem";
    this.cosmicBackground = new Zdog.Illustration({
      element: this.selector,
      resize: true,
      dragRotate: true,
      zoom: 1
    });

    this.earth = new Planet({
      parent: this.cosmicBackground,
      diameter: 180,
      orbit: false,
      atmosphere: {
        color: "#FFFFFF",
        radius: 10
      }
    });

    for (let i = 0; i < 1; i++) {
      this.earth.moons.push(
        new Planet({
          parent:
            Math.random() > 0.6 && i > 0
              ? this.earth.anchor
              : this.earth.getRandomMoon(),
          diameter: random(5, 60),
          color: "#886677",
          atmosphere: false,
          orbit: {
            period: random(7000, 8000),
            offset: random(0, Zdog.TAU),
            distance: {
              apogee: random(300, 600),
              perigee: random(300, 600)
            }
          }
        })
      );
    }

    this.cosmicBackground.rotate.z = Zdog.TAU / 256;
    this.cosmicBackground.rotate.y = Zdog.TAU / 2;
    this.cosmicBackground.rotate.x = -Zdog.TAU / 32;
  }

  animate() {
    this.earth.animate();
    this.cosmicBackground.updateRenderGraph();
    requestAnimationFrame(this.animate.bind(this));
  }
}

class SolarSystemWrapper extends Component {
  render() {
    const solarsystem = new SolarSystem();
    solarsystem.animate();
    return null;
  }
}

export default SolarSystemWrapper;
