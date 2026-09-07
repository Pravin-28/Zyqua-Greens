// Main JavaScript file for Zyqua Greens
console.log("Zyqua Greens main.js loaded");


document.addEventListener("DOMContentLoaded", () => {
    // Hero Video Autoplay handler for iPhone / Safari / Mobile
    const video = document.getElementById("hero-bg-video") || document.querySelector(".hero-bg-video");
    if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.loop = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.setAttribute("loop", "");

        const playVideo = () => {
            if (video.paused) {
                const promise = video.play();
                if (promise !== undefined) {
                    promise.catch(() => {
                        // iPhone/Safari low power mode policy
                    });
                }
            }
        };

        playVideo();

        // Retry whenever Safari buffers enough data
        video.addEventListener("loadeddata", playVideo);
        video.addEventListener("canplay", playVideo);
        video.addEventListener("canplaythrough", playVideo);
        video.addEventListener("loadedmetadata", playVideo);

        // Resume on page visibility or Safari back/forward navigation
        window.addEventListener("pageshow", playVideo);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                playVideo();
            }
        });

        // Loop guarantee for mobile Safari
        video.addEventListener("ended", () => {
            video.currentTime = 0;
            playVideo();
        });

        // Fallback on first touch/interaction for low power mode on iOS
        const unlockOnTouch = () => {
            playVideo();
            if (!video.paused) {
                window.removeEventListener("touchstart", unlockOnTouch);
                window.removeEventListener("touchend", unlockOnTouch);
                window.removeEventListener("click", unlockOnTouch);
                window.removeEventListener("scroll", unlockOnTouch);
            }
        };
        window.addEventListener("touchstart", unlockOnTouch, { passive: true });
        window.addEventListener("touchend", unlockOnTouch, { passive: true });
        window.addEventListener("click", unlockOnTouch, { passive: true });
        window.addEventListener("scroll", unlockOnTouch, { passive: true });
    }

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
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true,
            // },
            pagination: {
                el: '.microgreens-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.microgreens-swiper .swiper-button-next',
                prevEl: '.microgreens-swiper .swiper-button-prev',
            },
        });
    }

    // Initialize Fresh Greens Video Swiper Slider
    const freshGreensWrap = document.querySelector('.freshgreens-slider-wrap');
    if (freshGreensWrap && typeof Swiper !== 'undefined') {
        const freshSwiperEl = freshGreensWrap.querySelector('.freshgreens-swiper');

        const playActiveSlideVideo = (swiper) => {
            const allVideos = freshGreensWrap.querySelectorAll('video');
            allVideos.forEach(v => {
                v.pause();
                v.muted = true;
            });

            const activeSlide = swiper.slides[swiper.activeIndex];
            if (activeSlide) {
                const video = activeSlide.querySelector('video');
                if (video) {
                    video.muted = true;
                    video.currentTime = 0;
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(err => {
                            console.log("Autoplay caught:", err);
                        });
                    }
                }
            }
        };

        const freshSwiper = new Swiper(freshSwiperEl, {
            loop: true,
            speed: 600,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.freshgreens-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.freshgreens-swiper .swiper-button-next',
                prevEl: '.freshgreens-swiper .swiper-button-prev',
            },
            on: {
                init: function () {
                    playActiveSlideVideo(this);
                },
                slideChangeTransitionEnd: function () {
                    playActiveSlideVideo(this);
                }
            }
        });
    }
});
