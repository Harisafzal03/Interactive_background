import React, { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mousePressed = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray = [];
    let numberOfParticles = calculateNumberOfParticles(window.innerWidth);

    const mouse = {
      x: null,
      y: null,
      radius: 100
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mousedown', () => {
      mousePressed.current = true;
    });

    window.addEventListener('mouseup', () => {
      mousePressed.current = false;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.originalSize = size;
        this.color = this.getGradient();
      }

      getGradient() {
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#9357cc');
        gradient.addColorStop(0.5, '#2989d8');
        gradient.addColorStop(1, '#2cc99d');
        return gradient;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        if (this.x > canvas.width) {
          this.x = 0;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (mousePressed.current) {
            if (distance < 200) {
                this.size = Math.min(this.originalSize * 6000, this.size + 5);
                this.color = '#000000'; 
                this.alpha = 1;
              } else if (distance < 350) {
                this.size = Math.min(this.originalSize * 2000, this.size + 5);
                this.alpha = 0.8;
              } else if (distance < 450) {
                this.size = Math.min(this.originalSize * 1000, this.size + 5);
                this.alpha = 0.8;
              } else {
                this.size = this.originalSize;
                this.alpha = 1;
              }
        } else {
          this.size = this.originalSize;
          this.alpha = 1;
        }
        if (!mousePressed.current && !distance < 300) {
          if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 10;
            }
          }
        }
        this.x += this.directionX * 1;
        this.y += this.directionY * 1;
        this.draw();
      }
    }

    function calculateNumberOfParticles(width) {
        if (width >= 1280) { 
          return 700;
        } else if (width >= 1024) { 
          return 600;
        } else if (width >= 768) { 
          return 400;
        } else if (width >= 640) { 
          return 300;
        } else { 
          return 100;
        }
      }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * (0.03125 - 0.003125)) + 0.003125;
        const x = Math.random() * (window.innerWidth - size * 2);
        const y = Math.random() * (window.innerHeight - size * 2);
        const directionX = (Math.random() * 1) + 1;
        const directionY = Math.random() * 2 - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          const dx = (particlesArray[a].x + particlesArray[b].x) / 2 - mouse.x;
          const dy = (particlesArray[a].y + particlesArray[b].y) / 2 - mouse.y;
          const midpointDistance = Math.sqrt(dx * dx + dy * dy);

          if (mousePressed.current && midpointDistance < 300) {
            continue;
          }

          let opacityValue = 1 - (distance / 10000);
          if (opacityValue > 0) {
            let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    gradient.addColorStop(0, '#2dc1a5');
                    gradient.addColorStop(0.5, '#29a6be');
                    gradient.addColorStop(1, '#9258cc');
                    ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.4;
            ctx.globalAlpha = opacityValue;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    init();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    return () => {
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('mousedown', () => {});
      window.removeEventListener('mouseup', () => {});
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default InteractiveBackground;