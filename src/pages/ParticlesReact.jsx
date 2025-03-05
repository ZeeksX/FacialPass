import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import HomePage from "./HomePage";

const ParticlesReact = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: ""
        }
      },
      fullScreen: false,
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push"
          },
          onHover: {
            enable: false,
            mode: "repulse"
          }
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.1,
            size: 40
          },
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: "#000000"
        },
        links: {
          color: "#000000",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 0.8
        },
        move: {
          direction: "none",
          enable: true,
          outModes: "bounce",
          random: true,
          speed: 5,
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 200
        },
        opacity: {
          value: 0.1
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 3 }
        }
      },
      detectRetina: true
    }),
    []
  );

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-white to-[#C7CEEC]">
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      )}
      <div className="flex flex-col gap-2 lg:gap-0 w-full relative z-10">
        <div className="flex flex-col min-h-screen w-full">
          <HomePage />
        </div>
      </div>
    </div>
  );
};

export default ParticlesReact;
