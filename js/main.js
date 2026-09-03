// Main JavaScript file for Zyqua Greens
console.log("Zyqua Greens main.js loaded");


document.addEventListener("DOMContentLoaded", () => {
    // Handle Contact Form Auto-Select via URL Params
    const contactReasonSelect = document.getElementById("contactReason");
    if (contactReasonSelect) {
        const urlParams = new URLSearchParams(window.location.search);
        const inquiryParam = urlParams.get('inquiry');
        
        if (inquiryParam) {
            // Map parameter values to option values
            const mapping = {
                "consultation": "consultation",
                "greens": "greens",
                "microgreens": "microgreens"
            };
            
            if (mapping[inquiryParam]) {
                contactReasonSelect.value = mapping[inquiryParam];
            }
        }
    }

    // Handle Contact Form Submission mock
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Check HTML5 validity
            if (contactForm.checkValidity()) {
                // @TODO: Wire real form submission endpoint here
                // fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) })...

                // Hide form, show success state
                document.getElementById("contact-form-wrapper").classList.add("d-none");
                document.getElementById("contact-success").classList.remove("d-none");
            }
        });
    }
    // Handle Products Page Email Capture Forms
    const notifyForms = document.querySelectorAll(".notify-form");
    notifyForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                // @TODO: wire real subscription endpoint
                form.classList.add("d-none");
                form.nextElementSibling.classList.remove("d-none");
            }
        });
    });

    // Initialize Microgreens Swiper Slider
    if (document.querySelector('.microgreens-swiper') && typeof Swiper !== 'undefined') {
        new Swiper('.microgreens-swiper', {
            loop: true,
            speed: 600,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
});
