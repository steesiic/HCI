window.addEventListener('DOMContentLoaded', function () {
    //NAVBAR — skupljanje pri scrollu
    var navbarShrink = function () {
        var nav = document.getElementById('mainNav');
        if (!nav) return;
        if (window.scrollY === 0) {
            nav.classList.remove('navbar-shrink');
        } else {
            nav.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);


    //BOOTSTRAP SCROLLSPY
    var mainNav = document.getElementById('mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    //MENI
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navLinks = document.querySelectorAll('#navbarResponsive .nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //BACK TO TOP
    var backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }

    //SCROLL REVEAL
    var revealElements = document.querySelectorAll(
        '.landmark-card, .timeline-item, .contact-card, .gallery-item, .about-section .col-lg-6'
    );

    revealElements.forEach(function (el, index) {
        el.classList.add('reveal');
        el.style.transitionDelay = ((index % 4) * 0.1) + 's';
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    //ACTIVE NAV LINK pri skrolanju
    var sections = document.querySelectorAll('section[id], header[id]');
    var navItems = document.querySelectorAll('#navbarResponsive .nav-link');

    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var activeId = entry.target.id;
                navItems.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + activeId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4, rootMargin: '-70px 0px 0px 0px' });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    //GALERIJA reakcija na klik
    document.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            item.style.outline = '2px solid #7ab648';
            setTimeout(function () { item.style.outline = ''; }, 600);
        });
    });

    //SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    //COUNT-UP ANIMACIJA za br stanovnika
    function animateNumber(el, start, end, suffix, duration) {
        var startTime = null;
        var step = function (timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(progress * (end - start) + start).toLocaleString('sr') + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(function (el) {
                    var text = el.textContent.trim();
                    if (/^\d/.test(text)) {
                        var num = parseInt(text.replace(/\D/g, ''));
                        var suffix = text.replace(/[\d.,]/g, '');
                        el.textContent = '0' + suffix;
                        animateNumber(el, 0, num, suffix, 1500);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    //NEWSLETTER — dugme disabled dok email nije validan
    var newsletterInput = document.getElementById('newsletterInput');
    var newsletterBtn   = document.getElementById('newsletterBtn');
    var newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterInput && newsletterBtn) {
        newsletterInput.addEventListener('input', function () {
            var valid = newsletterInput.value.includes('@') && newsletterInput.value.includes('.');
            newsletterBtn.disabled = !valid;
        });

        newsletterBtn.addEventListener('click', function () {
            if (newsletterBtn.disabled) return;

            newsletterSuccess.classList.remove('d-none');
            newsletterInput.value = '';
            newsletterBtn.disabled = true;
            newsletterInput.disabled = true;

            setTimeout(function () {
                newsletterInput.disabled = false;
                newsletterSuccess.classList.add('d-none');
            }, 4000);
        });
    }

});
