// Initialisation AOS (Animation on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Navigation active
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupérer les données du formulaire
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Validation simple
        if (!formData.nom || !formData.email || !formData.message) {
            showFormMessage('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        if (!validateEmail(formData.email)) {
            showFormMessage('Veuillez entrer un email valide', 'error');
            return;
        }

        // Simulation d'envoi (à remplacer par votre logique backend)
        try {
            // Simuler un délai d'envoi
            showFormMessage('Envoi en cours...', 'info');
            
            // Ici vous feriez un fetch vers votre API
            // const response = await fetch('votre-api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            
            // Simulation de succès
            setTimeout(() => {
                showFormMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                contactForm.reset();
            }, 1500);
            
        } catch (error) {
            showFormMessage('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
        }
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        if (type !== 'info') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Animation des stats
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.round(current) + (stat.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                }
            };
            
            updateStat();
        });
    }

    // Déclencher l'animation des stats quand elles sont visibles
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});