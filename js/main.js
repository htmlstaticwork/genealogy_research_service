// Theme Toggle Logic
const themeToggles = document.querySelectorAll('.theme-toggle');
const body = document.body;

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        
        // Update all theme icons
        document.querySelectorAll('.theme-toggle i').forEach(icon => {
            icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        });
        
        lucide.createIcons();
        localStorage.setItem('theme', newTheme);
    });
});

// RTL Toggle Logic
const rtlToggles = document.querySelectorAll('.rtl-toggle');
const htmlRoot = document.documentElement;

rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const currentDir = htmlRoot.getAttribute('dir');
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        htmlRoot.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    });
});

// Sticky Header and Back to Top Logic
const mainHeader = document.getElementById('main-header');
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to Top');
document.body.appendChild(backToTopBtn);

// Re-initialize lucide for the new button
if (window.lucide) {
    lucide.createIcons();
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    // Header Scroll Logic
    if (window.scrollY > 50) {
        mainHeader.style.padding = '5px 0';
        mainHeader.style.boxShadow = 'var(--shadow-md)';
    } else {
        mainHeader.style.padding = '10px 0';
        mainHeader.style.boxShadow = 'none';
    }

    // Back to Top Button Logic
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Mobile Menu (Hamburger) Logic
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// Persist data-theme and dir on load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedDir = localStorage.getItem('dir');
    
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeIcon.setAttribute('data-lucide', savedTheme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    }
    
    if (savedDir) {
        htmlRoot.setAttribute('dir', savedDir);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});
