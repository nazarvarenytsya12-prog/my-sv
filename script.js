// 1. ЗБЕРЕЖЕННЯ ІНФОРМАЦІЇ ПРО СИСТЕМУ
const sysInfo = {
    platform: navigator.platform,
    browser: navigator.userAgent
};
localStorage.setItem('os_info', JSON.stringify(sysInfo));

const footer = document.getElementById('site-footer');
if (footer) {
    footer.innerHTML = `Система: ${sysInfo.platform} | Браузер: ${sysInfo.browser}`;
}

// 2. ЗАВАНТАЖЕННЯ КОМЕНТАРІВ 
async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/3/comments');
        const data = await response.json();
        const section = document.getElementById('comments-section');

        // Очищуємо текст завантаження
        section.innerHTML = '<h2>Відгуки роботодавців (API)</h2>';

        data.forEach((comment) => {
            const div = document.createElement('div');
            div.style.borderLeft = "3px solid #3498db";
            div.style.paddingLeft = "15px";
            div.style.marginBottom = "20px";
            div.style.textAlign = "left";

            div.innerHTML = `
                <p><strong>${comment.name}</strong> (${comment.email})</p>
                <p>${comment.body.replace(/\n/g, '<br>')}</p>
            `;
            section.appendChild(div);
        });
    } catch (e) {
        console.error("Помилка API:", e);
        document.getElementById('comments-section').innerHTML = '<h2>Відгуки роботодавців (API)</h2><p>Помилка завантаження.</p>';
    }
}
fetchComments();

// 3. ТАЙМЕР МОДАЛЬНОГО ВІКНО 
setTimeout(() => {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('modal-hidden');
}, 60000);

const closeBtn = document.getElementById('close-modal');
if (closeBtn) {
    closeBtn.onclick = () => {
        document.getElementById('modal').classList.add('modal-hidden');
    };
}

// 4. ПЕРЕМИКАЧ ТЕМИ 
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-mode');
        themeBtn.innerText = document.body.classList.contains('dark-mode') ? "Денний режим" : "Нічний режим";
    };

    // Автоматична тема за часом (Денна від 07:00 до 21:00)
    const hour = new Date().getHours();
    if (hour < 7 || hour >= 21) {
        document.body.classList.add('dark-mode');
        themeBtn.innerText = "Денний режим";
    }
}
