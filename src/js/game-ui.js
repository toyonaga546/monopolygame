// game-ui.js
// UI描画・イベント管理

function drawCircleBoard() {
    const svg = document.getElementById('boardCircle');
    if (!svg) return;
    svg.innerHTML = '';
    // SVGのサイズをさらに拡大して表示範囲を広げる（位置はそのまま）
    svg.setAttribute('width', 1200);
    svg.setAttribute('height', 755);
    const offsetX = 40;
    const offsetY = -70; // 全体的に下げる
    const radius = 340; // 以前より+100px拡大
    const centerX = 450 + offsetX; // SVGの中心も拡大
    const centerY = 450 + offsetY;
    // マス目リストを拡張
    const boardCells = [
        { name: 'スタート', color: 'white' },
        { name: '地中海通り', color: 'brown' },
        { name: '共同基金', color: 'yellow' },
        { name: 'バルティック通り', color: 'brown' },
        { name: '所得税', color: 'gray' },
        { name: '鉄道会社1', color: 'black' },
        { name: 'オリエンタル通り', color: 'lightblue' },
        { name: 'チャンス', color: 'orange' },
        { name: 'バーモント通り', color: 'lightblue' },
        { name: 'コネチカット通り', color: 'lightblue' },
        { name: '刑務所', color: 'gray' },
        // ピンク3
        { name: 'セントチャールズ通り', color: 'pink' },
        { name: '電力会社', color: 'yellow' },
        { name: 'ステーツ通り', color: 'pink' },
        { name: 'バージニア通り', color: 'pink' },
        { name: '鉄道会社2', color: 'black' },
        // オレンジ3
        { name: 'セントジェームズ通り', color: 'orange' },
        { name: '共同基金', color: 'yellow' },
        { name: 'テネシー通り', color: 'orange' },
        { name: 'ニューヨーク通り', color: 'orange' },
        { name: '刑務所', color: 'gray' },
        { name: 'ケンタッキー通り', color: 'red' },
        { name: 'チャンス', color: 'orange' },
        { name: 'インディアナ通り', color: 'red' },
        { name: 'イリノイ通り', color: 'red' },
        { name: '鉄道会社3', color: 'black' },
        // 黄色3
        { name: 'アトランティック通り', color: 'yellow' },
        { name: 'ベンヴェント通り', color: 'yellow' },
        { name: '水道局', color: 'yellow' },
        { name: 'マービンガーデン', color: 'yellow' },
        // 緑3
        { name: '刑務所', color: 'gray' },
        { name: 'パシフィック通り', color: 'green' },
        { name: 'ノースカロライナ通り', color: 'green' },
        { name: '共同基金', color: 'yellow' },
        { name: 'ペンシルバニア通り', color: 'green' },
        { name: 'チャンス', color: 'orange' },
        { name: '鉄道会社4', color: 'black' },
        { name: 'パークプレイス', color: 'blue' },
        { name: '贅沢税', color: 'gray' },
        { name: 'ボードウォーク', color: 'blue' }
    ];
    for (let i = 0; i < boardCells.length; i++) {
        const angle = (2 * Math.PI * i) / boardCells.length - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const cell = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        cell.setAttribute('cx', x);
        cell.setAttribute('cy', y);
        cell.setAttribute('r', 32);
        const colorMap = {
            brown: '#a0522d',
            lightblue: '#87ceeb',
            red: '#e74c3c',
            blue: '#3498db',
            railroad: '#fff', // 鉄道会社を白に
            utility: '#e817f7',
            yellow: '#f7e017',
            orange: '#ffa500',
            gray: '#bbb',
            white: '#fff',
            pink: '#ff69b4', // ピンク物件
            green: '#27ae60' // 緑物件
        };
        // 鉄道会社のSVG描画色を修正
        let cellColor = colorMap[boardCells[i].color] || '#fff';
        // "鉄道会社"という名前の場合は強制的に白に
        if (boardCells[i].name.includes('鉄道会社')) {
            cellColor = '#fff';
        }
        cell.setAttribute('fill', cellColor);
        cell.setAttribute('stroke', '#333');
        cell.setAttribute('stroke-width', '2');
        svg.appendChild(cell);
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('class', 'cell-label');
        label.textContent = boardCells[i].name;
        svg.appendChild(label);
        // プレイヤー表示（playersはグローバル変数）
        if (typeof players !== 'undefined') {
            players.forEach(player => {
                if (player.position === i && !player.isBankrupt) {
                    const p = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    p.setAttribute('x', x);
                    p.setAttribute('y', y + 18);
                    p.setAttribute('class', 'cell-label');
                    p.setAttribute('fill', '#fff');
                    p.textContent = `P${player.id}`;
                    svg.appendChild(p);
                }
            });
        }
    }

    // 現在のプレイヤー表示
    if (typeof currentPlayerIndex !== 'undefined' && typeof players !== 'undefined' && players.length > 0) {
        const infoDiv = document.getElementById('gameInfo');
        if (infoDiv) {
            let currentPlayerDiv = document.getElementById('currentPlayerInfo');
            if (currentPlayerDiv) currentPlayerDiv.remove();
            currentPlayerDiv = document.createElement('div');
            currentPlayerDiv.id = 'currentPlayerInfo';
            const player = players[currentPlayerIndex];
            currentPlayerDiv.textContent = `現在のプレイヤー: プレイヤー${player.id} (${player.money}万円)`;
            infoDiv.prepend(currentPlayerDiv);
        }
    }

    // 現在の周回数表示（最後尾のプレイヤーのpositionを基準）
    if (typeof players !== 'undefined' && players.length > 0) {
        const infoDiv = document.getElementById('gameInfo');
        if (infoDiv) {
            let roundDiv = document.getElementById('currentRoundInfo');
            if (roundDiv) roundDiv.remove();
            roundDiv = document.createElement('div');
            roundDiv.id = 'currentRoundInfo';
            // 最後尾のプレイヤー（positionが最小の人）を基準
            let minPosition = Math.min(...players.map(p => p.position));
            // 1周目は0、2周目は1...とする場合
            let round = Math.floor(minPosition / boardCells.length) + 1;
            roundDiv.textContent = `現在の周回: ${round}周目（最後尾プレイヤー基準）`;
            infoDiv.appendChild(roundDiv);
        }
        // 合計金額表示を削除
        let totalDiv = document.getElementById('totalMoney');
        if (totalDiv) totalDiv.remove();
    }
}

// サイコロを振れるかどうか判定
function canRollDice() {
    // 購入フェーズ中はサイコロ不可
    return !(typeof purchasePhase !== 'undefined' && purchasePhase);
}

// 物件購入ボタンを有効化するか判定
function canBuyProperty() {
    // 物件購入フェーズ中のみ
    if (!(typeof purchasePhase !== 'undefined' && purchasePhase)) return false;
    const player = players[currentPlayerIndex];
    // gameBoardから購入可能な物件があるか判定
    return gameBoard.some(property =>
        property.owner === null &&
        property.price > 0 &&
        !player.properties.some(pr => pr.color === property.color)
    );
}

function updateActionButtons() {
    // サイコロを振る: プレイヤーのターン開始時のみ
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    if (rollDiceBtn) rollDiceBtn.disabled = !canRollDice();
    // 物件購入: サイコロを振った後、購入可能な場合のみ
    const buyPropertyBtn = document.getElementById('buyPropertyBtn');
    if (buyPropertyBtn) buyPropertyBtn.disabled = !canBuyProperty();
    // 交渉: 1周目以降のみ
    const negotiateBtn = document.getElementById('negotiateBtn');
    if (negotiateBtn) negotiateBtn.disabled = !canNegotiate();
}

// 物件購入フェーズ用のUI制御
function updatePurchasePhaseUI() {
    const buyPropertyBtn = document.getElementById('buyPropertyBtn');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const propertySelectDiv = document.getElementById('propertySelectDiv');
    if (typeof purchasePhase !== 'undefined' && purchasePhase) {
        if (buyPropertyBtn) buyPropertyBtn.disabled = false;
        if (rollDiceBtn) rollDiceBtn.disabled = true;
        // 物件選択UI表示
        if (propertySelectDiv) propertySelectDiv.style.display = 'block';
    } else {
        if (buyPropertyBtn) buyPropertyBtn.disabled = true;
        if (rollDiceBtn) rollDiceBtn.disabled = false;
        if (propertySelectDiv) propertySelectDiv.style.display = 'none';
    }
}

// 物件選択UI生成
function renderPropertySelect() {
    let propertySelectDiv = document.getElementById('propertySelectDiv');
    if (!propertySelectDiv) {
        propertySelectDiv = document.createElement('div');
        propertySelectDiv.id = 'propertySelectDiv';
        propertySelectDiv.style.margin = '10px 0';
        const gameActions = document.getElementById('gameActions');
        if (gameActions) gameActions.parentNode.insertBefore(propertySelectDiv, gameActions);
    }
    propertySelectDiv.innerHTML = '';
    if (typeof purchasePhase !== 'undefined' && purchasePhase) {
        const player = players[currentPlayerIndex];
        // 日本語名マッピング
        const nameMap = {
            "Brown Property 1": "地中海通り",
            "Brown Property 2": "バルティック通り",
            "Light Blue Property 1": "オリエンタル通り",
            "Light Blue Property 2": "バーモント通り",
            "Light Blue Property 3": "コネチカット通り",
            "Pink Property 1": "セントチャールズ通り",
            "Pink Property 2": "ステーツ通り",
            "Pink Property 3": "バージニア通り",
            "Orange Property 1": "セントジェームズ通り",
            "Orange Property 2": "テネシー通り",
            "Orange Property 3": "ニューヨーク通り",
            "Red Property 1": "ケンタッキー通り",
            "Red Property 2": "インディアナ通り",
            "Red Property 3": "イリノイ通り",
            "Yellow Property 1": "アトランティック通り",
            "Yellow Property 2": "ベンヴェント通り",
            "Yellow Property 3": "マービンガーデン",
            "Green Property 1": "パシフィック通り",
            "Green Property 2": "ノースカロライナ通り",
            "Green Property 3": "ペンシルバニア通り",
            "Blue Property 1": "パークプレイス",
            "Blue Property 2": "ボードウォーク",
            "Railroad Company 1": "鉄道会社1",
            "Railroad Company 2": "鉄道会社2",
            "Railroad Company 3": "鉄道会社3",
            "Railroad Company 4": "鉄道会社4",
            "Electric Company": "電力会社",
            "Water Works": "水道局",
            "Jail": "刑務所",
            "Start": "スタート",
            "Tax": "所得税",
            "Luxury Tax": "贅沢税",
            "Chance": "チャンス",
            "Community Chest": "共同基金"
        };
        const select = document.createElement('select');
        select.id = 'propertySelect';
        // nameMapのキーをすべて走査し、gameBoardに存在しない場合は仮の物件として追加
        Object.entries(nameMap).forEach(([engName, jpName], idx) => {
            // gameBoardから該当物件を探す
            let property = gameBoard.find(p => p.name === engName || jpName === p.name);
            let canBuy = false;
            if (property) {
                // 本物件: 未購入かつ同色未所持なら購入可能
                canBuy = property.owner === null && property.price > 0 && !player.properties.some(pr => pr.color === property.color);
            }
            // 仮物件は購入不可
            const option = document.createElement('option');
            option.value = property ? property.index : (gameBoard.length + idx);
            option.textContent = `${jpName} (${property && property.price > 0 ? property.price + '万円' : '購入不可'})`;
            if (!canBuy) option.disabled = true;
            select.appendChild(option);
        });
        propertySelectDiv.appendChild(select);
    }
}

// 物件購入ボタンのイベント
const buyPropertyBtn = document.getElementById('buyPropertyBtn');
if (buyPropertyBtn) {
    buyPropertyBtn.onclick = function() {
        if (typeof purchasePhase !== 'undefined' && purchasePhase) {
            const player = players[currentPlayerIndex];
            const select = document.getElementById('propertySelect');
            if (!select || select.options.length === 0) {
                alert('購入可能な物件がありません。パスします。');
                if (typeof passPropertyPhase === 'function') passPropertyPhase();
                if (typeof nextPlayerPurchasePhase === 'function') nextPlayerPurchasePhase();
                refreshUI();
                return;
            }
            const propertyIndex = parseInt(select.value);
            const property = gameBoard[propertyIndex];
            if (typeof buyPropertyPhase === 'function') {
                buyPropertyPhase(player, property);
                if (typeof nextPlayerPurchasePhase === 'function') nextPlayerPurchasePhase();
                refreshUI();
            }
        }
    };
}

// パスボタンのイベント
const passBtn = document.getElementById('passBtn');
if (passBtn) {
    passBtn.onclick = function() {
        if (typeof purchasePhase !== 'undefined' && purchasePhase) {
            if (typeof passPropertyPhase === 'function') passPropertyPhase();
            if (typeof nextPlayerPurchasePhase === 'function') nextPlayerPurchasePhase();
            refreshUI();
        }
    };
}

// 物件購入フェーズUI初期化
if (typeof updatePurchasePhaseUI === 'function') updatePurchasePhaseUI();
if (typeof renderPropertySelect === 'function') renderPropertySelect();

// 盤面以外のUI要素（#gameInfo, #gameActions, #players など）を下にずらす
window.addEventListener('DOMContentLoaded', () => {
    const infoDiv = document.getElementById('gameInfo');
    if (infoDiv) infoDiv.style.marginTop = '100px';
    const actionsDiv = document.getElementById('gameActions');
    if (actionsDiv) actionsDiv.style.marginTop = '100px';
    const playersDiv = document.getElementById('players');
    if (playersDiv) playersDiv.style.marginTop = '100px';
});

function updatePlayersInfo() {
    const playersDiv = document.getElementById('players');
    if (!playersDiv) return;
    playersDiv.innerHTML = '';
    if (typeof players !== 'undefined' && Array.isArray(players)) {
        players.forEach((player, idx) => {
            const div = document.createElement('div');
            div.className = 'player-info';
            // 所持物件名リストを取得
            let propertyNames = player.properties && player.properties.length > 0
                ? player.properties.map(p => {
                    // 日本語名マッピング
                    const nameMap = {
                        "Brown Property 1": "地中海通り",
                        "Brown Property 2": "バルティック通り",
                        "Light Blue Property 1": "オリエンタル通り",
                        "Light Blue Property 2": "バーモント通り",
                        "Light Blue Property 3": "コネチカット通り",
                        "Pink Property 1": "セントチャールズ通り",
                        "Pink Property 2": "ステーツ通り",
                        "Pink Property 3": "バージニア通り",
                        "Orange Property 1": "セントジェームズ通り",
                        "Orange Property 2": "テネシー通り",
                        "Orange Property 3": "ニューヨーク通り",
                        "Red Property 1": "ケンタッキー通り",
                        "Red Property 2": "インディアナ通り",
                        "Red Property 3": "イリノイ通り",
                        "Yellow Property 1": "アトランティック通り",
                        "Yellow Property 2": "ベンヴェント通り",
                        "Yellow Property 3": "マービンガーデン",
                        "Green Property 1": "パシフィック通り",
                        "Green Property 2": "ノースカロライナ通り",
                        "Green Property 3": "ペンシルバニア通り",
                        "Blue Property 1": "パークプレイス",
                        "Blue Property 2": "ボードウォーク",
                        "Railroad Company 1": "鉄道会社1",
                        "Railroad Company 2": "鉄道会社2",
                        "Railroad Company 3": "鉄道会社3",
                        "Railroad Company 4": "鉄道会社4",
                        "Electric Company": "電力会社",
                        "Water Works": "水道局"
                    };
                    // 色情報も表示
                    return `${nameMap[p.name] || p.name}（${p.color}）`;
                }).join(', ')
                : 'なし';
            div.textContent = `プレイヤー${player.id}: ${player.money}万円　物件: ${propertyNames}`;
            if (idx === currentPlayerIndex) {
                div.style.fontWeight = 'bold';
                div.style.color = '#3498db';
            }
            playersDiv.appendChild(div);
        });
    }
}

// プレイヤー情報を毎ターン・物件購入時に必ず更新
function refreshUI() {
    drawCircleBoard();
    updatePlayersInfo();
    updateActionButtons();
    updatePurchasePhaseUI();
    renderPropertySelect();
}

function canNegotiate() {
    // 1周目以降のみ交渉可能
    if (typeof players === 'undefined' || players.length === 0) return false;
    // boardCellsはdrawCircleBoard内で定義されているため、window.boardCellsとしてグローバル化している場合はそれを使う
    const cells = typeof boardCells !== 'undefined' ? boardCells : (window.boardCells || []);
    if (cells.length === 0) return false;
    let minPosition = Math.min(...players.map(p => p.position));
    let round = Math.floor(minPosition / cells.length) + 1;
    return round >= 2;
}
