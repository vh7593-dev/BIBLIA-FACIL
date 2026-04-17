document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FAQ Accordion (Nova Estrutura Base) ---
    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.icon');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

            // Close all others
            document.querySelectorAll('.faq-content').forEach(c => {
                c.style.maxHeight = "0px";
                const otherIcon = c.previousElementSibling.querySelector('.icon');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });

            // Toggle current
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = "0px";
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- 2. Countdown Timer (30 minutes, persistent) ---
    const TOTAL_MINUTES = 30;
    const TOTAL_SECONDS = TOTAL_MINUTES * 60;
    
    let endTime = localStorage.getItem('biblia_revelada_endTime');
    const now = Math.floor(Date.now() / 1000);
    
    if (!endTime || now > parseInt(endTime)) {
        endTime = now + TOTAL_SECONDS;
        localStorage.setItem('biblia_revelada_endTime', endTime);
    } else {
        endTime = parseInt(endTime);
    }
    
    const countdownDisplay = document.getElementById('countdown');
    
    function updateCountdown() {
        const currentTime = Math.floor(Date.now() / 1000);
        let remaining = endTime - currentTime;
        
        if (remaining <= 0) {
            countdownDisplay.textContent = '00:00';
            return;
        }
        
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        
        const minutesStr = m < 10 ? "0" + m : m;
        const secondsStr = s < 10 ? "0" + s : s;
        countdownDisplay.textContent = minutesStr + ":" + secondsStr;
        
        requestAnimationFrame(updateCountdown);
    }
    
    requestAnimationFrame(updateCountdown);
    // Animação foi removida conforme pedido pelo usuário.

    // --- 4. Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 5. Smooth scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
