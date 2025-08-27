// game-core.js
// ゲームのロジック（初期化・進行・物件・プレイヤー管理）

const initialMoney = 1500;
let players = [];
let currentPlayerIndex = 0;
let round = 1;
let gameBoard = [];
let properties = [];
let gameActive = false;
let purchasePhase = true;
let passCount = 0;

function initializeGame(playerCount) {
    players = Array.from({ length: playerCount }, (_, index) => ({
        id: index + 1,
        money: initialMoney,
        properties: [],
        position: 0,
        isBankrupt: false,
    }));
    currentPlayerIndex = Math.floor(Math.random() * playerCount);
    gameActive = true;
    setupBoard();
    startPurchasePhase();
}

function setupBoard() {
    properties = [
        { name: "Brown Property 1", price: 100, color: "brown" },
        { name: "Brown Property 2", price: 100, color: "brown" },
        { name: "Light Blue Property 1", price: 150, color: "lightblue" },
        { name: "Light Blue Property 2", price: 150, color: "lightblue" },
        // 刑務所
        { name: "Jail", price: 0, color: "gray" },
        // ピンク物件3つ
        { name: "Pink Property 1", price: 200, color: "pink" },
        { name: "Pink Property 2", price: 220, color: "pink" },
        { name: "Pink Property 3", price: 240, color: "pink" },
        // オレンジ物件3つ
        { name: "Orange Property 1", price: 260, color: "orange" },
        { name: "Orange Property 2", price: 280, color: "orange" },
        { name: "Orange Property 3", price: 300, color: "orange" },
        // 鉄道会社2
        { name: "Railroad Company 2", price: 200, color: "black" },
        // 赤色物件
        { name: "Red Property 1", price: 320, color: "red" },
        { name: "Red Property 2", price: 340, color: "red" },
        { name: "Red Property 3", price: 360, color: "red" },
        // 黄色物件3つ
        { name: "Yellow Property 1", price: 380, color: "yellow" },
        { name: "Yellow Property 2", price: 400, color: "yellow" },
        { name: "Yellow Property 3", price: 420, color: "yellow" },
        // みどり物件3つ
        { name: "Green Property 1", price: 440, color: "green" },
        { name: "Green Property 2", price: 460, color: "green" },
        { name: "Green Property 3", price: 480, color: "green" },
        // 鉄道会社3
        { name: "Railroad Company 3", price: 200, color: "black" },
        // ...必要に応じて追加...
    ];
    gameBoard = properties.map((property, index) => ({
        ...property,
        owner: null,
        index: index,
    }));
}

function canBuyPropertyThisPhase(player, property) {
    // 物件が未購入かつ、同じ色の物件を既に持っていない場合のみ購入可能
    if (!property || property.owner !== null) return false;
    return !player.properties.some(p => p.color === property.color);
}

function buyPropertyPhase(player, property) {
    if (!canBuyPropertyThisPhase(player, property)) {
        alert('同じ色の物件は複数購入できません。');
        return false;
    }
    if (player.money >= property.price) {
        player.money -= property.price;
        property.owner = player.id;
        player.properties.push(property);
        passCount = 0;
        alert(`プレイヤー${player.id}が${property.name}を購入しました。`);
        return true;
    } else {
        alert(`プレイヤー${player.id}は${property.name}を購入する資金が足りません。`);
        return false;
    }
}

function passPropertyPhase() {
    passCount++;
    if (passCount >= players.length) {
        purchasePhase = false;
        alert('全員パスしたのでサイコロフェーズに移行します。');
        // サイコロボタンを有効化
        const rollDiceBtn = document.getElementById('rollDiceBtn');
        if (rollDiceBtn) rollDiceBtn.disabled = false;
    }
}

function nextPlayerPurchasePhase() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

// 物件購入フェーズの進行（初期化時に呼び出し）
function startPurchasePhase() {
    purchasePhase = true;
    passCount = 0;
    currentPlayerIndex = 0;
    // サイコロボタンを無効化
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    if (rollDiceBtn) rollDiceBtn.disabled = true;
    // 物件購入ボタンを有効化
    const buyPropertyBtn = document.getElementById('buyPropertyBtn');
    if (buyPropertyBtn) buyPropertyBtn.disabled = false;
}

function playerTurn() {
    if (!gameActive) return;
    const currentPlayer = players[currentPlayerIndex];
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    currentPlayer.position = (currentPlayer.position + diceRoll) % gameBoard.length;
    const landedProperty = gameBoard[currentPlayer.position];
    if (landedProperty.owner === null) {
        if (confirm(`Do you want to buy ${landedProperty.name} for $${landedProperty.price}?`)) {
            buyProperty(currentPlayer, landedProperty);
        }
    } else if (landedProperty.owner !== currentPlayer.id) {
        payRent(currentPlayer, landedProperty);
    }
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function buyProperty(player, property) {
    if (player.money >= property.price) {
        player.money -= property.price;
        property.owner = player.id;
        player.properties.push(property);
        alert(`${player.id} bought ${property.name}`);
    } else {
        alert(`${player.id} does not have enough money to buy ${property.name}`);
    }
}

function payRent(player, property) {
    const rent = calculateRent(property);
    if (player.money >= rent) {
        player.money -= rent;
        const owner = players[property.owner - 1];
        owner.money += rent;
        alert(`${player.id} paid $${rent} rent to ${owner.id}`);
    } else {
        player.isBankrupt = true;
        alert(`${player.id} is bankrupt!`);
    }
}

function calculateRent(property) {
    return property.price * 0.1;
}

// ...他のロジック関数も必要に応じてここに追加...
