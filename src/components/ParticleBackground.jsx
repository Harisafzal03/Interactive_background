import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#0000FF", "#00FF00", "#800080"],
          },
          links: {
            color: "#ffffff",
            distance: 50, // Reduced distance for closer links
            enable: true,
            opacity: 0.5,
            width: 0.5, // Thinner lines
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "right",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 3, // Increased speed
            straight: true,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 200,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 1, // Smaller particles
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
