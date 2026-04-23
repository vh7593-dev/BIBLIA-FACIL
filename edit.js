const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Padding
html = html.replace('html, body { \r\n    overflow-x: hidden;', 'html, body { \r\n    overflow-x: hidden;\r\n    padding-top: 40px;');
html = html.replace('html, body { \n    overflow-x: hidden;', 'html, body { \n    overflow-x: hidden;\n    padding-top: 40px;');

// 2. Sticky Header
const stickyHeader = `    <div id="sticky-header" style="position: fixed; top: 0; left: 0; width: 100%; background-color: #d10000; color: #fff; text-align: center; padding: 10px 15px; font-weight: bold; z-index: 100000; font-size: 14px; text-transform: uppercase; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
        🚨 OFERTA ESPECIAL EXPIRA EM: <span id="sticky-countdown">10:00</span>
    </div>\n\n`;
html = html.replace('<body>', '<body>\n' + stickyHeader);

// 3. New CSS
const css = `
    /* Carousel CSS */
    .whatsapp-carousel {
        width: 100%;
        overflow: hidden;
        position: relative;
        padding: 40px 0;
    }
    .carousel-track {
        display: flex;
        gap: 20px;
        align-items: center;
        animation: scrollCarousel 20s linear infinite;
        width: max-content;
    }
    .carousel-track:hover {
        animation-play-state: paused;
    }
    .carousel-track img {
        width: 300px;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
    @keyframes scrollCarousel {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-320px * 3)); }
    }
    
    /* Plans CSS */
    .plans-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-top: 40px;
    }
    @media (min-width: 768px) {
        .plans-container {
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
        }
    }
    .plan-card {
        flex: 1;
        max-width: 400px;
        background: var(--gradient-dark);
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 16px;
        padding: 40px 30px;
        display: flex;
        flex-direction: column;
        position: relative;
        text-align: left;
        margin: 0 auto;
        width: 100%;
    }
    .plan-card.highlight {
        border: 2px solid var(--primary);
        box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15);
        transform: scale(1.02);
    }
    .plan-highlight-badge {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary);
        color: #000;
        font-weight: 700;
        padding: 5px 20px;
        border-radius: 20px;
        font-size: 14px;
        letter-spacing: 1px;
        white-space: nowrap;
    }
    .plan-title {
        font-size: 24px;
        color: #fff;
        margin-bottom: 5px;
        font-weight: 700;
        font-family: 'Outfit', sans-serif;
    }
    .plan-subtitle {
        font-size: 14px;
        color: var(--text-dim);
        margin-bottom: 20px;
    }
    .plan-price {
        margin-bottom: 30px;
    }
    .plan-price-old {
        font-size: 16px;
        color: #ff5e5e;
        text-decoration: line-through;
        margin-bottom: 5px;
    }
    .plan-price-new {
        font-size: 38px;
        font-weight: 700;
        color: #fff;
        font-family: 'Outfit', sans-serif;
    }
    .highlight .plan-price-new {
        color: var(--primary);
        text-shadow: 0 0 20px rgba(212,175,55,0.4);
    }
    .plan-features {
        list-style: none;
        padding: 0;
        margin: 0 0 30px 0;
        flex-grow: 1;
    }
    .plan-features li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 15px;
        color: #e6e6e6;
    }
    .risk-inversion {
        text-align: center;
        margin-top: 40px;
        font-size: 16px;
        color: var(--text-dim);
        line-height: 1.6;
        font-style: italic;
    }
</style>`;
html = html.replace('</style>', css);

// 4. Carousel Section
const carouselSection = `
    <!-- CAROSSEL WHATSAPP -->
    <section id="whatsapp-proof" class="bg-alt" style="padding: 40px 0;">
        <div class="container text-center">
            <h2 class="mb-15">O que dizem no <span class="gradient-text">WhatsApp</span></h2>
        </div>
        <div class="whatsapp-carousel">
            <div class="carousel-track">
                <!-- Duplicate images for continuous scroll -->
                <img src="whatsapp-print-1.jpg" alt="Depoimento WhatsApp" onerror="this.src='hero-bible.webp'">
                <img src="whatsapp-print-2.jpg" alt="Depoimento WhatsApp" onerror="this.src='hero-bible.webp'">
                <img src="whatsapp-print-3.jpg" alt="Depoimento WhatsApp" onerror="this.src='hero-bible.webp'">
                <img src="whatsapp-print-1.jpg" alt="Depoimento WhatsApp" onerror="this.src='hero-bible.webp'">
                <img src="whatsapp-print-2.jpg" alt="Depoimento WhatsApp" onerror="this.src='hero-bible.webp'">
                <img src="whatsapp-print-3.jpg" alt="Depoimento WhatsApp" onerror="this.src='hero-bible.webp'">
            </div>
        </div>
    </section>
`;
html = html.replace('<section id="proof"', carouselSection + '\\n    <section id="proof"');

// 5. Replace CTAs
const ctaRegex = /<a href="[^"]+" class="cta-btn"([^>]*)>[\\s\\S]*?<\\/a>/g;
html = html.replace(ctaRegex, (match, attrs) => {
    if (match.includes('final-checkout-cta')) return match;
    
    return \`<a href="#planos" class="cta-btn"\${attrs}>
        <span>QUERO ENTENDER A BÍBLIA DE VERDADE →</span>
        <span>Acesso Imediato • Pagamento Único</span>
    </a>\`;
});

const ctaRegexHero = /<a href="[^"]+" class="cta-btn">[\\s\\S]*?<\\/a>/g;
html = html.replace(ctaRegexHero, (match) => {
    return \`<a href="#planos" class="cta-btn">
                <span>QUERO ENTENDER A BÍBLIA DE VERDADE →</span>
                <span>Acesso Imediato • Pagamento Único</span>
            </a>\`;
});

// 6. Replace Plans Section
const plansSection = \`
    <!-- S13 -->
    <section id="planos">
        <div class="container" style="max-width: 1000px; text-align: center;">
            <h2 class="mb-40">Escolha Seu <span class="gradient-text">Plano:</span></h2>
            
            <div class="plans-container">
                <!-- PLANO BÁSICO -->
                <div class="plan-card">
                    <div class="plan-title">PLANO BÁSICO</div>
                    <div class="plan-subtitle">Para quem quer começar a entender</div>
                    
                    <div class="plan-price">
                        <div class="plan-price-old">De R$ 97,00</div>
                        <div class="plan-price-new">R$ 17,00</div>
                    </div>
                    
                    <ul class="plan-features">
                        <li><img loading="lazy" src="https://unpkg.com/emoji-datasource-apple@15.0.0/img/apple/64/2705.png" width="18" height="18" alt="✅"> Acesso ao Mapa Principal</li>
                    </ul>
                    
                    <a href="https://pay.wiapy.com/VFkUkQv5uX" class="cta-btn final-checkout-cta" style="min-height: 60px;">
                        <span style="font-size: 16px; font-weight: 800;">QUERO O PLANO BÁSICO</span>
                    </a>
                </div>

                <!-- PLANO COMPLETO -->
                <div class="plan-card highlight">
                    <div class="plan-highlight-badge">★ MAIS ESCOLHIDO</div>
                    <div class="plan-title">PLANO COMPLETO</div>
                    <div class="plan-subtitle">Para quem quer o aprofundamento total</div>
                    
                    <div class="plan-price">
                        <div class="plan-price-old">De R$ 197,00</div>
                        <div class="plan-price-new">R$ 37,00</div>
                    </div>
                    
                    <ul class="plan-features">
                        <li><img loading="lazy" src="https://unpkg.com/emoji-datasource-apple@15.0.0/img/apple/64/2705.png" width="18" height="18" alt="✅"> Acesso ao Mapa Principal</li>
                        <li><img loading="lazy" src="https://unpkg.com/emoji-datasource-apple@15.0.0/img/apple/64/2705.png" width="18" height="18" alt="✅"> 8 Tratados do Apocalipse</li>
                        <li><img loading="lazy" src="https://unpkg.com/emoji-datasource-apple@15.0.0/img/apple/64/2705.png" width="18" height="18" alt="✅"> Acesso Vitalício</li>
                    </ul>
                    
                    <a href="https://pay.wiapy.com/VFkUkQv5uX" class="cta-btn final-checkout-cta" style="min-height: 60px;">
                        <span style="font-size: 18px; font-weight: 800;">SIM! QUERO RENOVAR MINHA FÉ</span>
                    </a>
                </div>
            </div>

            <div class="risk-inversion">
                "Pense com sinceridade: Será que continuar com a fé estagnada vale a economia de 37 reais? Isso é menos do que você gasta em um lanche no fim de semana. O risco é totalmente meu, você tem 7 dias de garantia incondicional."
            </div>
        </div>
    </section>
\`;

const summaryRegex = /<section id="summary">[\\s\\S]*?<\\/section>/;
html = html.replace(summaryRegex, plansSection);

// 7. Timer update
html = html.replace('const TOTAL_MINUTES = 30;', 'const TOTAL_MINUTES = 10;');

const stickyCountdownScript = \`
    // Sticky Countdown
    const stickyDisplay = document.getElementById('sticky-countdown');
    function updateStickyCountdown() {
        const currentTime = Math.floor(Date.now() / 1000);
        let remaining = endTime - currentTime;
        
        if (remaining <= 0) {
            if(stickyDisplay) stickyDisplay.textContent = '00:00';
            return;
        }
        
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        
        const minutesStr = m < 10 ? "0" + m : m;
        const secondsStr = s < 10 ? "0" + s : s;
        if(stickyDisplay) stickyDisplay.textContent = minutesStr + ":" + secondsStr;
        
        requestAnimationFrame(updateStickyCountdown);
    }
    requestAnimationFrame(updateStickyCountdown);
\`;

html = html.replace('requestAnimationFrame(updateCountdown);\\r\\n    // Animação foi removida', 'requestAnimationFrame(updateCountdown);\\n' + stickyCountdownScript);
// Also in case of different newline combinations
if (!html.includes(stickyCountdownScript)) {
    html = html.replace('requestAnimationFrame(updateCountdown);\\n    // Animação foi removida', 'requestAnimationFrame(updateCountdown);\\n' + stickyCountdownScript);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Script completed.');
