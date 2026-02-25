/**
 * CATHARSIS FARM - Official Animation Script 2026
 * Стилистика: Amethyst Cyberpunk
 */

// Регистрируем плагин ScrollTrigger
if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

window.addEventListener('load', () => {
    
    // Проверка наличия GSAP
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error("GSAP или ScrollTrigger не найдены. Проверьте подключение в HTML.");
        return;
    }

    // --- 1. АМЕТИСТОВЫЕ ЧАСТИЦЫ (Canvas) ---
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.spX = Math.random() * 0.4 - 0.2;
                this.spY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5;
            }
            update() {
                this.x += this.spX;
                this.y += this.spY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`; // Фиолетовый
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- 2. МЫШЬ: СВЕЧЕНИЕ И ПАРАЛЛАКС ---
    const glow = document.querySelector('.cursor-glow');
    
    window.addEventListener('mousemove', (e) => {
        // Движение пятна света
        if (glow) {
            gsap.to(glow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        // Параллакс Hero-контента
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;

        gsap.to(".hero-content", { x: moveX, y: moveY, duration: 1 });
        gsap.to(".t-left", { x: -moveX * 2.5, y: -moveY * 2.5, duration: 1.2 });
        gsap.to(".b-right", { x: moveX * 2.5, y: moveY * 2.5, duration: 1.2 });
    });

    // --- 3. СКРОЛЛ-АНИМАЦИИ (Для всех секций) ---

    // Анимация About (Feature Cards)
    gsap.from(".feature-card", {
        scrollTrigger: {
            trigger: ".about-grid",
            start: "top 85%",
        },
        autoAlpha: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all" 
    });

    // Анимация Product (Карточки товаров)
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top 85%",
        },
        autoAlpha: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
    });

    // Анимация Warranty (Карточки гарантии)
    gsap.from(".warranty-card", {
        scrollTrigger: {
            trigger: ".warranty-grid",
            start: "top 85%",
        },
        autoAlpha: 0,
        x: (i) => i % 2 === 0 ? -30 : 30, // Выезжают с разных сторон
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        clearProps: "all"
    });

    // Анимация CTA кнопок (под гарантией)
    gsap.from(".cta-group a", {
        scrollTrigger: {
            trigger: ".cta-group",
            start: "top 95%",
        },
        autoAlpha: 0,
        y: 20,
        scale: 0.8,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
        clearProps: "all"
    });

    // --- 4. ФИНАЛЬНЫЙ FIX: ОБНОВЛЕНИЕ ТРИГГЕРОВ ---
    // Выполняем через небольшую паузу, чтобы браузер успел отрисовать всё
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
});