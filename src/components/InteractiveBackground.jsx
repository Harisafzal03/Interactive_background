import React, { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 400; 
    const mouse = {
      x: null,
      y: null,
      radius: 100
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
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
        ctx.fillStyle = this.color;
        ctx.fill();
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

        this.x += this.directionX * 1; 
        this.y += this.directionY * 1; 
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      const colors = ['#0000FF', '#00FF00', '#800080']; 
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * (0.03125 - 0.003125)) + 0.003125;


        const x = Math.random() * (window.innerWidth - size * 2);
        const y = Math.random() * (window.innerHeight - size * 2);
        const directionX = (Math.random() * 1) + 1; 
        const directionY = Math.random() * 2 - 1; 
        const color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          const dx = mouse.x - (particlesArray[a].x + particlesArray[b].x) / 2;
          const dy = mouse.y - (particlesArray[a].y + particlesArray[b].y) / 2;
          const mouseDistance = Math.sqrt(dx * dx + dy * dy);

          if (distance < (canvas.width / 14) * (canvas.height / 14) && mouseDistance > mouse.radius) {
            opacityValue = 1 - (distance / 10000);
            let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#2dc1a5'); 
            gradient.addColorStop(0.5, '#29a6be'); 
            gradient.addColorStop(1, '#9258cc'); 
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.4; 
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
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
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default InteractiveBackground;
