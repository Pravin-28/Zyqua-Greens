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
            })
            .catch(err => console.error("Error loading footer:", err));
        promises.push(p2);
    }

    Promise.all(promises).then(() => {
        document.dispatchEvent(new Event("partialsLoaded"));
    });
});



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


