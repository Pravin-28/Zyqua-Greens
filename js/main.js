// Main JavaScript file for Zyqua Greens
console.log("Zyqua Greens main.js loaded");


document.addEventListener("DOMContentLoaded", () => {
    // Robust Hero Background Video playback handler for iPhone / iOS / Mobile browsers
    const heroVideo = document.querySelector('.hero-bg-video');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;
        heroVideo.playsInline = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('webkit-playsinline', '');

        const playHeroVideo = () => {
            if (heroVideo.paused) {
                const playPromise = heroVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay may be restricted (e.g. iOS Low Power Mode)
                    });
                }
            }
        };

        // Attempt playback on various stages of loading
        playHeroVideo();
        heroVideo.addEventListener('loadedmetadata', playHeroVideo);
        heroVideo.addEventListener('canplay', playHeroVideo);
        heroVideo.addEventListener('loadeddata', playHeroVideo);

        // Resume if user returns to tab/app on iPhone
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                playHeroVideo();
            }
        });

        // Autoplay unlock fallback on first user interaction (touch, tap, scroll) for iOS Low Power Mode
        const unlockMobileVideo = () => {
            playHeroVideo();
            if (!heroVideo.paused) {
                window.removeEventListener('touchstart', unlockMobileVideo);
                window.removeEventListener('touchend', unlockMobileVideo);
                window.removeEventListener('click', unlockMobileVideo);
                window.removeEventListener('scroll', unlockMobileVideo);
            }
        };

        window.addEventListener('touchstart', unlockMobileVideo, { passive: true });
        window.addEventListener('touchend', unlockMobileVideo, { passive: true });
        window.addEventListener('click', unlockMobileVideo, { passive: true });
        window.addEventListener('scroll', unlockMobileVideo, { passive: true });
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
