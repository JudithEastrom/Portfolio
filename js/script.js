document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particle-container');
    const themeSwitcher = document.getElementById('themeSwitcher');
    let particles = [];

    // 1. Function to create a single particle
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 20 + 10;
        const startLeft = Math.random() * 100; // % of width
        const duration = Math.random() * 8 + 4; // seconds to fall
        const delay = Math.random() * -20;      // staggered starting time

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startLeft}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`; 
        particle.style.animationName = 'fall';

        particleContainer.appendChild(particle);
        return particle;
    }

    // 2. Function to initialize/refresh particles
    function initParticles() {
        if (!particleContainer) return;
        particleContainer.innerHTML = ''; // Clear existing
        particles = [];
        for (let i = 0; i < 40; i++) {
            particles.push(createParticle());
        }
    }

    // 3. Handle Theme Change
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            
            // Update the Body Class
            document.body.classList.remove('theme-dark', 'theme-cold', 'theme-autumn', 'theme-winter', 'theme-spring', 'theme-summer');
            document.body.classList.add(selectedTheme);

            // Save to Memory (localStorage)
            localStorage.setItem('selectedTheme', selectedTheme);

            // Refresh particles immediately so they change shape/color
            initParticles();
        });
    }

    // 4. On Page Load: Set the theme from Memory
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (themeSwitcher) themeSwitcher.value = savedTheme;
    } else {
        // Default if no memory exists yet
        document.body.classList.add('theme-dark');
        if (themeSwitcher) themeSwitcher.value = 'theme-dark';
    }

    // 5. Initialize particles on every page load
    initParticles();

    // Parallax Effect Logic
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll('[data-speed]');
        elements.forEach(el => {
            const speed = el.getAttribute('data-speed');
            const yPos = (scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
    
});


