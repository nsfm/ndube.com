import { Component } from "react";
import Zdog from "zdog";
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

/**
 * Tracks a Moon whose position can be determined by the current time, relative
 * to a parent body.
 */
class Moon {
  constructor({
    parent,
    diameter = 25,
    orbitalPeriod = 5000,
    orbitalDistance = 200,
    orbitalOffset = Zdog.TAU
  }) {
    this.orbitalPeriod = orbitalPeriod; // Milliseconds.
    this.orbitalDistance = orbitalDistance; // perigee+apogee or radius
    this.orbitalOffset = orbitalOffset; // Rotate the orbital plane

    this.model = new Zdog.Shape({
      addTo: parent,
      stroke: diameter,
      color: "#FFFFFF"
    });
  }

  getOrbitalAngle() {
    return Zdog.lerp(
      0,
      Zdog.TAU,
      (Date.now() % this.orbitalPeriod) / this.orbitalPeriod
    );
  }

  getOrbitalPosition() {
    let perigee, apogee;
    if (typeof this.orbitalDistance === "number") {
      perigee = this.orbitalDistance;
      apogee = this.orbitalDistance;
    } else {
      ({ perigee, apogee } = this.orbitalDistance);
    }

    return pointOnEllipse(
      0,
      0,
      apogee,
      perigee,
      this.orbitalOffset,
      this.getOrbitalAngle()
    );
  }

  updatePosition() {
    const { x, y } = this.getOrbitalPosition();
    this.model.translate.x = x;
    this.model.translate.z = y;
  }
}

/**
 * Manages the planets.
 */
class SolarSystem {
  constructor() {
    this.selector = "#solarsystem";
    this.illo = new Zdog.Illustration({
      element: this.selector,
      resize: true,
      dragRotate: true,
      zoom: 1
    });

    this.earth = new Zdog.Shape({
      addTo: this.illo,
      stroke: 150,
      color: "#636"
    });

    this.moons = [];
    for (let i = 0; i < 20; i++) {
      this.moons.push(
        new Moon({
          parent: this.earth,
          diameter: random(5, 60),
          orbitalPeriod: random(1000, 120000),
          orbitalOffset: random(0, Zdog.TAU),
          orbitalDistance: {
            apogee: random(300, 600),
            perigee: random(300, 600)
          }
        })
      );
    }

    this.illo.rotate.z = Zdog.TAU / 256;
    this.illo.rotate.y = Zdog.TAU / 2;
    this.illo.rotate.x = -Zdog.TAU / 32;
  }

  animate() {
    this.moons.forEach(moon => moon.updatePosition());
    this.illo.updateRenderGraph();
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
