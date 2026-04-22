// Тақырыпты ауыстыру (ашық/қараңғы)
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️ Ашық тақырып' : '🌙 Қараңғы тақырып';
});

// Карточкалар анимациясы (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// Чат логикасы
let requestCount = 0;
const sendBtn = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const requestCountSpan = document.getElementById('requestCount');

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.textContent = text;
    div.className = `message ${sender}-message`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getDemoResponse(question) {
    const responses = [
        "Бұл қызықты сұрақ! Мен сізге көмектесуге тырысамын.",
        "Веб-әзірлеуде Grid және Flexbox жиі қолданылады.",
        "ЖИ-құралдары код жазу процесін тездетеді.",
        "HTML, CSS және JavaScript - веб-әзірлеудің негізі."
    ];
    await new Promise(r => setTimeout(r, 500));
    return responses[Math.floor(Math.random() * responses.length)];
}

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    requestCount++;
    requestCountSpan.textContent = requestCount;
    userInput.value = '';
    
    addMessage('✍️ Жауап жазылуда...', 'bot');
    const response = await getDemoResponse(message);
    chatMessages.removeChild(chatMessages.lastChild);
    addMessage(response, 'bot');
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});