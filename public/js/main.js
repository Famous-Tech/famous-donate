// Main JavaScript file for Famous Tech

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du header sticky
    initStickyHeader();
    
    // Initialisation du slider de témoignages
    initTestimonialsSlider();
    
    // Initialisation des animations au scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Smooth scroll pour les liens d'ancrage
    initSmoothScroll();
});

// Fonction pour rendre le header sticky lors du scroll
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Fonction pour initialiser le slider de témoignages
function initTestimonialsSlider() {
    const testimonialsSwiper = document.querySelector('.testimonials-swiper');
    
    if (testimonialsSwiper) {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

// Fonction pour le smooth scroll des liens d'ancrage
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fonction pour afficher une notification
function showNotification(title, message, type = 'success') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            text: message,
            icon: type,
            confirmButtonText: 'OK',
            confirmButtonColor: type === 'success' ? '#4CAF50' : '#dc3545'
        });
    }
}

// Fonction pour valider un formulaire
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (!form) return false;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Fonction pour animer les compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const duration = 2000; // 2 secondes
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.innerText = target + '+';
                clearInterval(interval);
            } else {
                counter.innerText = current + '+';
            }
        };
        
        const interval = setInterval(updateCounter, 16);
    });
}

// Observer pour déclencher l'animation des compteurs lorsqu'ils sont visibles
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Gestion des boutons de montant sur la page de don
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.querySelector('.custom-amount-input');

if (amountButtons.length > 0) {
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Afficher/masquer l'input de montant personnalisé
            if (this.classList.contains('custom-amount')) {
                customAmountInput.style.display = 'block';
            } else {
                customAmountInput.style.display = 'none';
            }
        });
    });
}

// Activer le premier bouton de montant par défaut
if (amountButtons.length > 0) {
    amountButtons[0].click();
} 