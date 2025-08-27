document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startGame');
    const playerCountSelect = document.getElementById('playerCount');

    if (startBtn && playerCountSelect) {
        startBtn.addEventListener('click', () => {
            const count = parseInt(playerCountSelect.value, 10);
            localStorage.setItem('playerCount', count);
            window.location.href = 'game.html';
        });
    }
});