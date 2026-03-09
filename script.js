// 1. Зберігання даних про систему
const sysInfo = {
    platform: navigator.platform,
    browser: navigator.userAgent
};
localStorage.setItem('os_info', JSON.stringify(sysInfo));
document.getElementById('site-footer').innerHTML = `Система: ${sysInfo.platform} | Браузер: ${sysInfo.browser}`;

// 2. Завантаження відгуків (Варіант 3)
async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/3/comments');
        const data = await response.json();
        const section = document.getElementById('comments-section');
        section.innerHTML = '<h2>Відгуки роботодавців</h2>';

        const translations = [
            "Назар проявив себе як відповідальний фахівець у кібербезпеці.",
            "Great analytical skills and deep knowledge of Python scripts.",
            "Робота над базою даних була виконана вчасно та дуже професійно.",
            "Надійний колега, відмінно працює з Cisco Packet Tracer.",
            "Дякуємо за допомогу в розгортанні серверів на XAMPP."
        ];

        data.forEach((comment, index) => {
            const div = document.createElement('div');
            div.style.borderLeft = "3px solid #3498db";
            div.style.paddingLeft = "15px";
            div.style.marginBottom = "15px";
            div.innerHTML = `<strong>${comment.email}</strong><br>${translations[index] || comment.body}`;
            section.appendChild(div);
        });
    } catch (e) { console.error("Помилка API:", e); }
}
fetchComments();

// 3. Відкриття модального вікна для відправки листа (1 хвилина)
setTimeout(() => {
    document.getElementById('modal').classList.remove('modal-hidden');
}, 60000);

document.getElementById('close-modal').onclick = () => {
    document.getElementById('modal').classList.add('modal-hidden');
};

// 4. Перемикач теми
const btn = document.getElementById('theme-toggle');
btn.onclick = () => {
    document.body.classList.toggle('dark-mode');
    btn.innerText = document.body.classList.contains('dark-mode') ? "Денний режим" : "Нічний режим";
};

// Автоматична тема за часом
const hour = new Date().getHours();
if (hour < 7 || hour >= 21) {
    document.body.classList.add('dark-mode');
    btn.innerText = "Денний режим";
}