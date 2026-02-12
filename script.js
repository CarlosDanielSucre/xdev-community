// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Event listener for theme toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// Section Management
const navLinks = document.querySelectorAll('.nav a[data-section]');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Update active links
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
}

// Navigation event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Initialize with home section
showSection('home');

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animate stats on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'countUp 2s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-box, .about-stat').forEach(box => {
    observer.observe(box);
});

// Button click handlers (simulated)
document.querySelectorAll('.cta-button, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.getAttribute('data-section')) {
            e.preventDefault();
            showNotification(`Action: ${this.textContent.trim()}`);
        }
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff3366, #e6006d);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(255, 51, 102, 0.4);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Filter projects
const projectFilterInput = document.querySelector('.projects-filters .filter-input');

function filterProjects() {
    if (!projectFilterInput) return;
    
    const searchText = projectFilterInput.value.toLowerCase();
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        
        if (title.includes(searchText) || description.includes(searchText)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInSection 0.3s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

if (projectFilterInput) {
    projectFilterInput.addEventListener('input', filterProjects);
}

// Lazy loading for member cards
document.querySelectorAll('.member-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Animation for blog cards
document.querySelectorAll('.blog-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Scroll reveal for elements
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .member-card, .blog-card, .challenge-card, .project-card').forEach(element => {
    element.style.opacity = '0.7';
    element.style.transform = 'translateY(20px)';
    revealObserver.observe(element);
});

// Challenge participation management
document.querySelectorAll('.btn-challenge').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const challengeCard = button.closest('.challenge-card');
        const challengeTitle = challengeCard.querySelector('h3').textContent;
        
        if (button.textContent === 'Participar') {
            button.textContent = '✓ Participando';
            button.style.background = '#00d9ff';
            button.style.color = '#050812';
            showNotification(`¡Participando en: ${challengeTitle}!`);
        } else {
            button.textContent = 'Participar';
            button.style.background = 'var(--primary)';
            button.style.color = 'white';
            showNotification('Participación cancelada');
        }
    });
});

// Project view and contribute management
document.querySelectorAll('.btn-project, .btn-project-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        if (button.classList.contains('btn-project')) {
            showNotification(`Abriendo repositorio de: ${projectTitle}`);
            // In a real implementation, this would open GitHub
            window.open('#', '_blank');
        } else {
            showNotification(`¡Listo para contribuir a: ${projectTitle}!`);
        }
    });
});

// Make logo clickable to return to home
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

document.querySelector('.logo').style.cursor = 'pointer';

// Navigation hover effects
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (this.getAttribute('data-section') !== document.querySelector('.section.active').id) {
            this.style.opacity = '0.7';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// Initialize theme
initTheme();

// Initialization log
console.log('🚀 X devs website loaded successfully');
console.log('💡 Use the theme button to toggle between light and dark mode');
console.log('📱 Navigate through sections using the main menu');
