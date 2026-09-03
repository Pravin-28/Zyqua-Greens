const fs = require('fs');

// 1. UPDATE STYLE.CSS
let css = fs.readFileSync('css/style.css', 'utf8');

// Color Palette Overhaul
css = css.replace(/--color-bg:\s*#FFFFFF;/, '--color-bg: #F4F6F5;');
css = css.replace(/--color-ink:\s*#2B2B28;/, '--color-ink: #1A1A1A;');
css = css.replace(/--color-ink-soft:\s*#6B6B63;/, '--color-ink-soft: #555555;');
css = css.replace(/--color-green:\s*#3F5D3A;/, '--color-green: #2E7D32;');
css = css.replace(/--color-green-dark:\s*#2E4429;/, '--color-green-dark: #1B5E20;');
css = css.replace(/--color-green-tint:\s*#EEF3EA;/, '--color-green-tint: #E8F5E9;');
css = css.replace(/--color-border:\s*#E4E4DE;/, '--color-border: #E0E0E0;');

// Typography Updates
css = css.replace(/--font-heading:\s*'Fraunces', serif;/, '--font-heading: "Inter", sans-serif;\n  --font-serif: "Playfair Display", serif;');
css = css.replace(/--font-body:\s*'Inter', sans-serif;/, '--font-body: "Inter", sans-serif;');

// Add new classes for the new aesthetic
if (!css.includes('.font-serif-italic')) {
    css += `
/* AGROVIA OVERHAUL CLASSES */
.font-serif-italic {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 500;
}
.badge-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    background-color: #FFFFFF;
    color: var(--color-ink);
    font-weight: 500;
    font-size: 0.875rem;
    border: 1px solid var(--color-border);
}
.badge-pill::before {
    content: '•';
    color: var(--color-green);
    margin-right: 0.5rem;
    font-size: 1.2rem;
    line-height: 1;
}
.btn-zg {
    border-radius: 50px !important; /* Pill shape */
}
.card-soft {
    background-color: #FFFFFF;
    border-radius: 24px;
    padding: 2rem;
    border: 1px solid var(--color-border);
}
.media-placeholder {
    border-radius: 24px;
}
`;
}
fs.writeFileSync('css/style.css', css);

// 2. UPDATE INDEX.HTML (Hero & Layout)
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace Hero with new mixed typography and pill badges
indexHtml = indexHtml.replace(/<span class="eyebrow.*?<\/span>/, '<div class="badge-pill mb-4">About Zyqua</div>');
indexHtml = indexHtml.replace(/<h1 class="display-3 font-heading mb-4 text-white">.*?<\/h1>/s, 
    '<h1 class="display-3 font-heading mb-4 text-white">Smart Farming for Future <span class="font-serif-italic text-green-tint">Generations</span></h1>');

fs.writeFileSync('index.html', indexHtml);

console.log("Phase 1 Design Overhaul applied.");
