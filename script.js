document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Smooth Typing with Permanent Cursor ---
const textElement = document.getElementById('typing-name');
const cursorElement = document.getElementById('cursor');
const fullText = "MD WASI KHAN";
let index = 0;

textElement.textContent = "";

function type() {
    if (index < fullText.length) {
        textElement.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, 130);
    }
}

setTimeout(type, 800);

// --- 2. Simple & Fast Mobile Menu Toggle ---
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
        }
    });
});

    // --- 3. Active Link & Scroll ---
    const sections = document.querySelectorAll('section[id]');
    function scrollActive(){
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const scrollLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                scrollLink?.classList.add('active-link');
            } else {
                scrollLink?.classList.remove('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // --- 4. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');
    
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --- 5. Particles Background ---
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray = [];

    function getParticleColor() {
        return document.body.classList.contains('light-mode') ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 255, 195, 0.2)';
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            const color = getParticleColor().replace('0.2', '0.8');
            const blurColor = getParticleColor().replace('0.2', '1');

            ctx.fillStyle = color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = blurColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 10000;
        for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const lineColor = getParticleColor();

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = lineColor.replace('0.2', `${0.1 - distance/1500}`);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 6. Skills Carousel Disabled ---
    // Keeping skills as a static grid for better readability and mobile stability.
});