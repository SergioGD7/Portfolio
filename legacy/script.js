// Menú hamburguesa para móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Verificar que los elementos existen
    if (!hamburger || !navMenu) {
        console.error('Elementos del menú no encontrados');
        return;
    }
    
    // Función para abrir/cerrar menú
    function mobileMenu() {
        const socialLinks = document.querySelector('.social-links');
    
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Actualizar visibilidad de social-links
        handleSocialLinksVisibility();
    
        // Controlar visibilidad de social-links
        if (socialLinks) {
            if (navMenu.classList.contains('active')) {
                // Menú abierto - ocultar social-links
                socialLinks.style.opacity = '0';
                socialLinks.style.visibility = 'hidden';
                socialLinks.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                // Menú cerrado - mostrar social-links (solo en móvil)
                if (window.innerWidth <= 1400) {
                    socialLinks.style.opacity = '1';
                    socialLinks.style.visibility = 'visible';
                    socialLinks.style.transform = 'translateX(-50%) translateY(0)';
                }
            }
        }
    }
    
    // Event listener para el hamburguesa
    hamburger.addEventListener('click', mobileMenu);
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const socialLinks = document.querySelector('.social-links');
        
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Actualizar visibilidad de social-links
            handleSocialLinksVisibility();
        
            // Restaurar social-links cuando se cierra el menú
            if (socialLinks && window.innerWidth <= 1400) {
                socialLinks.style.opacity = '1';
                socialLinks.style.visibility = 'visible';
                socialLinks.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    });

    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            const socialLinks = document.querySelector('.social-links');
        
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Actualizar visibilidad de social-links
            handleSocialLinksVisibility();
        
            // Restaurar social-links cuando se cierra el menú
            if (socialLinks && window.innerWidth <= 1400) {
                socialLinks.style.opacity = '1';
                socialLinks.style.visibility = 'visible';
                socialLinks.style.transform = 'translateX(-50%) translateY(0)';
            }
        }
    });

    // Smooth scrolling para los enlaces de navegación
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



// Animación de aparición en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos específicos
document.querySelectorAll('.project-card, .about-text, .skills-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Inicializar EmailJS
(function() {
    emailjs.init("wJd_7Vv4NILbNl5GL");
})();

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // Crear elemento de notificación
    function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        ${type === 'success' ? 'background: linear-gradient(135deg, #19a2e6, #1489c7);' : 'background: linear-gradient(135deg, #dc3545, #c82333);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

    // Función para cambiar estado del botón
    function setButtonState(state) {
        const states = {
            initial: {
                text: 'SUBMIT',
                disabled: false,
                background: '#fff',
                cursor: 'pointer',
                opacity: '1'
            },
            loading: {
                text: 'ENVIANDO...',
                disabled: true,
                background: '#1489c7',
                cursor: 'not-allowed',
                opacity: '0.8'
            },
            success: {
                text: '✅ ENVIADO',
                disabled: true,
                background: '#28a745',
                cursor: 'default',
                opacity: '1'
            },
            error: {
                text: '❌ ERROR',
                disabled: true,
                background: '#dc3545',
                cursor: 'default',
                opacity: '1'
            }
        };
        
        const currentState = states[state];
        submitBtn.textContent = currentState.text;
        submitBtn.disabled = currentState.disabled;
        submitBtn.style.background = currentState.background;
        submitBtn.style.cursor = currentState.cursor;
        submitBtn.style.opacity = currentState.opacity;

    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                from_name: document.getElementById('name').value.trim(),
                from_email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                to_email: 'sergio.g.d7@gmail.com'
            };
            
            // Validación
            if (!formData.from_name || !formData.from_email || !formData.message) {
                alert('Por favor, completa todos los campos. 📝');
                return;
            }
            
            // Estado de carga
            setButtonState('loading');
            
            // Enviar email
            emailjs.send('service_d2k6n5i', 'template_owg2rbp', formData)
                .then(function(response) {
                showNotification('¡Mensaje enviado exitosamente! 🚀', 'success');
                form.reset();
            })
            .catch(function(error) {
                showNotification('Error al enviar. Inténtalo de nuevo 🔄', 'error');
            })
            .finally(function() {
                // Siempre restaurar el estado inicial
                setButtonState('initial');
            });
        });

    }
    

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }



    // Agregar certificaciones al observer para animaciones
document.querySelectorAll('.certification-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Ocultar social-links cuando el footer es visible O cuando el menú está activo
function handleSocialLinksVisibility() {
    const socialLinks = document.querySelector('.social-links');
    const footer = document.querySelector('.footer-right');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!socialLinks || !footer || !navMenu) return;

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isMenuActive = navMenu.classList.contains('active');

    // Ocultar si el menú está activo O si el footer es visible
    if (isMenuActive || footerRect.top <= windowHeight) {
        socialLinks.style.opacity = '0';
        socialLinks.style.visibility = 'hidden';
        socialLinks.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        socialLinks.style.opacity = '1';
        socialLinks.style.visibility = 'visible';
        socialLinks.style.transform = 'translateX(-50%) translateY(0)';
    }
}


// Ejecutar la función en scroll y resize solo en móvil
function initSocialLinksHiding() {
    if (window.innerWidth <= 1400) {
        window.addEventListener('scroll', handleSocialLinksVisibility);
        window.addEventListener('resize', handleSocialLinksVisibility);
        handleSocialLinksVisibility(); // Ejecutar una vez al cargar
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSocialLinksHiding);

// Re-inicializar en resize para manejar cambios de orientación
window.addEventListener('resize', () => {
    if (window.innerWidth > 1399) {
        window.removeEventListener('scroll', handleSocialLinksVisibility);
        window.removeEventListener('resize', handleSocialLinksVisibility);
    } else {
        initSocialLinksHiding();
    }
});




});

