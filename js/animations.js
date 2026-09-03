
gsap.registerPlugin(ScrollTrigger);

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Dribbble-style easing (very slow finish)
const dribbbleEase = "expo.out";

function splitTextIntoSpans(element) {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';
    const words = text.split(' ');
    words.forEach(word => {
        if (word.trim() === '') return;
        const wrapper = document.createElement('span');
        wrapper.className = 'word-wrap';
        const inner = document.createElement('span');
        inner.className = 'word';
        inner.innerText = word;
        wrapper.appendChild(inner);
        element.appendChild(wrapper);
        element.appendChild(document.createTextNode(' ')); // Add the space back!
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (prefersReducedMotion) return;

    // --- GLOBAL EFFECTS --- //

    // 1. Magnetic Buttons (Removed in favor of simple CSS)
    // isTouch logic and gsap.quickTo removed here based on user request

    // 2. The "Spring" Text Reveal (Migrated to WOW.js / Animate.css)
    const statements = document.querySelectorAll('h1, .big-statement');
    statements.forEach(el => {
        el.classList.add('wow', 'animate__animated', 'animate__fadeInUp');
    });

    // 3. Migrate Images to WOW.js
    gsap.utils.toArray(".media-placeholder").forEach(media => {
        media.classList.add('wow', 'animate__animated', 'animate__fadeIn');
        media.style.opacity = '1';
        media.style.clipPath = 'none';
    });

    // 4. Pill Badge "Pop" Entrances
    gsap.utils.toArray(".badge-pill").forEach(badge => {
        badge.classList.add('wow', 'animate__animated', 'animate__zoomIn');
    });

    // 5. Standard Content Fades
    gsap.utils.toArray(".text-ink, .text-ink-soft, .story-content p").forEach(p => {
        if (p.closest('.big-statement') || p.closest('h1')) return;
        if (p.closest('.card-soft')) return;
        p.classList.add('wow', 'animate__animated', 'animate__fadeInUp');
    });

    // 6. Card Entrances (Team & Projects)
    gsap.utils.toArray(".card-soft").forEach(card => {
        card.classList.add('wow', 'animate__animated', 'animate__fadeInUp');
    });

    // 7. Timeline Markers Pop
    gsap.utils.toArray(".timeline-marker").forEach(marker => {
        marker.classList.add('wow', 'animate__animated', 'animate__bounceIn');
    });
});

// Animations that depend on partials (navbar/footer)
document.addEventListener("partialsLoaded", () => {
    if (prefersReducedMotion) return;
    
    const mainNavbar = document.getElementById("mainNavbar");
    const navbarWrapper = document.getElementById("site-navbar");
    
    if (mainNavbar && navbarWrapper && navbarWrapper.classList.contains("navbar-transparent")) {
        mainNavbar.style.backgroundColor = "transparent";
        
        ScrollTrigger.create({
            trigger: mainNavbar,
            start: "top -50px",
            end: "top -51px",
            onEnter: () => {
                gsap.to(mainNavbar, { 
                    backgroundColor: "var(--color-bg)", 
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.to(mainNavbar.querySelectorAll('.logo-text, .nav-link'), {
                    color: "var(--color-ink)",
                    duration: 0.4
                });
                gsap.to(mainNavbar.querySelectorAll('.navbar-brand img'), {
                    filter: "none",
                    duration: 0.4
                });
            },
            onLeaveBack: () => {
                gsap.to(mainNavbar, { 
                    backgroundColor: "transparent", 
                    boxShadow: "none",
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.to(mainNavbar.querySelectorAll('.logo-text, .nav-link'), {
                    color: "#FFFFFF",
                    duration: 0.4
                });
                gsap.to(mainNavbar.querySelectorAll('.navbar-brand img'), {
                    filter: "brightness(0) invert(1) grayscale(100%)",
                    duration: 0.4
                });
            }
        });
    }
});
