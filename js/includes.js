document.addEventListener("DOMContentLoaded", () => {
    const navbarPlaceholder = document.getElementById("site-navbar");
    const footerPlaceholder = document.getElementById("site-footer");

    const promises = [];

    if (navbarPlaceholder) {
        const p1 = fetch("partials/navbar.html")
            .then(res => res.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                initNavbarScript(navbarPlaceholder);
            })
            .catch(err => console.error("Error loading navbar:", err));
        promises.push(p1);
    }

    if (footerPlaceholder) {
        const p2 = fetch("partials/footer.html")
            .then(res => res.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                updateFooterTagline(footerPlaceholder);
            })
            .catch(err => console.error("Error loading footer:", err));
        promises.push(p2);
    }

    Promise.all(promises).then(() => {
        document.dispatchEvent(new Event("partialsLoaded"));
    });
});

function updateFooterTagline(wrapper) {
    const taglineEl = wrapper.querySelector(".footer-tagline");
    if (!taglineEl) return;

    if (wrapper.dataset && wrapper.dataset.tagline) {
        taglineEl.textContent = wrapper.dataset.tagline;
        return;
    }
    if (document.body.dataset && document.body.dataset.tagline) {
        taglineEl.textContent = document.body.dataset.tagline;
        return;
    }

    const path = window.location.pathname.toLowerCase();
    const bodyClass = (document.body.className || "").toLowerCase();

    if (bodyClass.includes("page-about") || path.includes("about")) {
        taglineEl.textContent = "We believe the future of food begins with the way we choose to grow it.";
    } else if (bodyClass.includes("page-products") || path.includes("products")) {
        taglineEl.textContent = "Freshness you can see, quality you can trust, and goodness you can feel.";
    } else if (bodyClass.includes("page-projects") || path.includes("projects")) {
        taglineEl.textContent = "Creating a better connection between how food is grown and how it reaches your table.";
    } else if (bodyClass.includes("page-team") || path.includes("team")) {
        taglineEl.textContent = "Because when we grow with care, every harvest has the power to make a difference.";
    }
}



function initNavbarScript(wrapper) {
    const mainNavbar = document.getElementById("mainNavbar");
    if (!mainNavbar) return;

    const toggler = mainNavbar.querySelector('.navbar-toggler');
    const collapseEl = document.getElementById('navbarContent');

    if (toggler && collapseEl) {
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Manually toggle the Bootstrap 'show' class to bypass any CDN load-order race conditions
            collapseEl.classList.toggle('show');

            // Force solid background if at the top of the page when opening
            if (wrapper.classList.contains("navbar-transparent") && window.scrollY <= 50) {
                mainNavbar.classList.toggle('bg-solid-mobile');
            }
        });
    }
}


