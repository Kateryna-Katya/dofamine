// Підключи GSAP у HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

window.addEventListener('load', () => {
    // 1. Анімація сяйва за мишкою (тепер з аметистовим відтінком у CSS)
    const glow = document.querySelector('.cursor-glow');
    window.addEventListener('mousemove', (e) => {
        gsap.to(glow, {
            x: e.clientX,
            y: e.clientY,
            duration: 1,
            ease: "power2.out"
        });

        // 2. Паралакс ефект для контенту (текст та лого трохи рухаються за мишкою)
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

        gsap.to(".hero-content", {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power2.out"
        });

        // Паралакс для кутових логотипів (рухаються у протилежний бік для глибини)
        gsap.to(".t-left", { x: -moveX * 2, y: -moveY * 2, duration: 1.5 });
        gsap.to(".b-right", { x: moveX * 2, y: moveY * 2, duration: 1.5 });
    });

    // 3. Аметистові частинки (Particle System)
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Функція для встановлення розміру канвасу
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];
    const particleCount = 100; // Трохи збільшив кількість для ефектності

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6; // Зробив трохи яскравіше
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            // КОЛІР ОНОВЛЕНО: Тепер це яскравий аметист (168, 85, 247)
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});