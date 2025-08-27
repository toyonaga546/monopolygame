// game-setup.js
// ゲーム開始時の設定・localStorage管理

document.addEventListener('DOMContentLoaded', () => {
    // プレイヤー人数をlocalStorageから取得
    const playerCount = localStorage.getItem('playerCount') ? parseInt(localStorage.getItem('playerCount')) : 3;
    // ゲーム初期化（game-core.jsのinitializeGameを呼び出し）
    if (typeof initializeGame === 'function') {
        initializeGame(playerCount);
    }
    // 各プレイヤーの金額を表示
    if (typeof players !== 'undefined') {
        const infoDiv = document.getElementById('gameInfo');
        if (infoDiv) {
            // 合計金額表示（既存）
            let totalMoney = players.reduce((sum, p) => sum + p.money, 0);
            let totalDiv = document.getElementById('totalMoney');
            if (!totalDiv) {
                totalDiv = document.createElement('div');
                totalDiv.id = 'totalMoney';
                infoDiv.appendChild(totalDiv);
            }
            totalDiv.textContent = `プレイヤー合計金額: ${totalMoney}万円`;
            // 各プレイヤーの金額表示
            let playerMoneyDiv = document.getElementById('playerMoneyList');
            if (playerMoneyDiv) playerMoneyDiv.remove();
            playerMoneyDiv = document.createElement('div');
            playerMoneyDiv.id = 'playerMoneyList';
            players.forEach(p => {
                const pDiv = document.createElement('div');
                pDiv.textContent = `プレイヤー${p.id}: ${p.money}万円`;
                playerMoneyDiv.appendChild(pDiv);
            });
            infoDiv.appendChild(playerMoneyDiv);
        }
    }
    // 必要に応じてUI初期化（game-ui.jsの関数を呼び出し）
    if (typeof drawCircleBoard === 'function') {
        drawCircleBoard();
    }
});
