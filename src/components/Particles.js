import React, { useEffect } from "react";

const Particles = () => {
  useEffect(() => {
    const options = {
      idCanvas: "canvas", // id Canvas
      bgCanvas: "rgba(2, 6, 23,1)", //kolor tła
      colorParticle: "rgba(255,255,255,1)", // kolor cząsteczeki
      colorConnect: "255,255,255", // kolor kreski miedży cząsteczkami w rgb podawac w taki sposób
      numberOfParticles: (window.innerHeight * window.innerHeight) / 10000, // ilość cząsteczek
      sizeMin: 1.0, // minimalny rozmiar cząsteczeki
      sizeMax: 2.0, // maxymalny rozmiar cząsteczeki
      lineWidthConnect: 1, // gubość lini miedzy cząsteczkami
      speed: 1, // mnożnik prędkości cząsteczek
      mouseMove: false, // właczenie pola myszki
      mouseArea: 1, // mnożnik pola myszki
    };
    const canvas = document.querySelector(`#${options.idCanvas}`);
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let particleArray;
    canvas.style.backgroundColor = options.bgCanvas;

    let mouse = {
      x: null,
      y: null,
      radius: (canvas.height / 97) * (canvas.width / 97) * options.mouseArea,
    };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = options.colorParticle;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY;
        }
        if (options.mouseMove) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.directionX = -this.directionX;
              this.x += 1;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.directionX = -this.directionX;
              this.x -= 1;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.directionY = -this.directionY;
              this.y += 1;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.directionY = -this.directionY;
              this.y -= 1;
            }
          }
        }

        this.x += this.directionX * options.speed;
        this.y += this.directionY * options.speed;

        this.draw();
      }
    }

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let distance =
            (particleArray[a].x - particleArray[b].x) *
              (particleArray[a].x - particleArray[b].x) +
            (particleArray[a].y - particleArray[b].y) *
              (particleArray[a].y - particleArray[b].y);
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            opacityValue = 1 - distance / 10000;
            ctx.strokeStyle = `rgba(${options.colorConnect},${opacityValue})`;
            ctx.beginPath();
            ctx.lineWidth = options.lineWidthConnect;
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      particleArray = [];
      for (let i = 0; i < options.numberOfParticles; i++) {
        let size = Math.random() * options.sizeMax + options.sizeMin;
        let x =
          Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
        let y =
          Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;

        let color = options.colorConnect;
        particleArray.push(
          new Particle(x, y, directionX, directionY, size, color)
        );
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
      }
      connect();
    };
    init();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.radius =
        (canvas.height / 97) * (canvas.width / 97) * options.mouseArea;
      init();
    });

    window.addEventListener("mouseout", () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });
  }, []);

  return (
    <canvas
      id="canvas"
      className="absolute top-0 left-0 w-full h-full"
    ></canvas>
  );
};

export default Particles;