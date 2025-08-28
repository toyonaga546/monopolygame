// game-core.js
// ゲームのロジック（初期化・進行・物件・プレイヤー管理）

const initialMoney = 1500;
let players = [];
let currentPlayerIndex = 0;
let gameBoard = [];
let gameActive = false;

function initializeGame(playerCount) {
  players = Array.from({ length: playerCount }, (_, i) => ({
    id: i + 1,
    money: initialMoney,
    properties: [],
    position: 0,
    isBankrupt: false,
  }));
  currentPlayerIndex = 0;
  setupBoard();
  gameActive = true;
}

function setupBoard() {
  // 40マスの外周（日本語表記）
  gameBoard = [
    { name: "スタート",            color: "corner",    price: 0,   owner: null },
    { name: "地中海通り",          color: "brown",     price: 100, owner: null },
    { name: "共同基金",            color: "community", price: 0,   owner: null },
    { name: "バルティック通り",    color: "brown",     price: 120, owner: null },
    { name: "所得税",              color: "tax",       price: 0,   owner: null },
    { name: "リーディング鉄道",    color: "railroad",  price: 200, owner: null },
    { name: "オリエンタル通り",    color: "lightblue", price: 140, owner: null },
    { name: "チャンス",            color: "chance",    price: 0,   owner: null },
    { name: "バーモント通り",      color: "lightblue", price: 160, owner: null },
    { name: "コネチカット通り",    color: "lightblue", price: 180, owner: null },
    { name: "刑務所",              color: "corner",    price: 0,   owner: null },

    { name: "セントチャールズ通り", color: "pink",      price: 200, owner: null },
    { name: "電力会社",            color: "utility",   price: 150, owner: null },
    { name: "ステーツ通り",        color: "pink",      price: 220, owner: null },
    { name: "バージニア通り",      color: "pink",      price: 240, owner: null },
    { name: "ペンシルバニア鉄道",  color: "railroad",  price: 200, owner: null },
    { name: "セントジェームズ通り", color: "orange",    price: 260, owner: null },
    { name: "共同基金",            color: "community", price: 0,   owner: null },
    { name: "テネシー通り",        color: "orange",    price: 280, owner: null },
    { name: "ニューヨーク通り",    color: "orange",    price: 300, owner: null },
    { name: "フリーパーキング",    color: "corner",    price: 0,   owner: null },

    { name: "ケンタッキー通り",    color: "red",       price: 320, owner: null },
    { name: "チャンス",            color: "chance",    price: 0,   owner: null },
    { name: "インディアナ通り",    color: "red",       price: 340, owner: null },
    { name: "イリノイ通り",        color: "red",       price: 360, owner: null },
    { name: "B&O鉄道",            color: "railroad",  price: 200, owner: null },
    { name: "アトランティック通り", color: "yellow",    price: 380, owner: null },
    { name: "ヴェントナー通り",    color: "yellow",    price: 400, owner: null },
    { name: "水道局",              color: "utility",   price: 150, owner: null },
    { name: "マービンガーデン",    color: "yellow",    price: 420, owner: null },
    { name: "刑務所へ行く",        color: "corner",    price: 0,   owner: null },

    { name: "パシフィック通り",    color: "green",     price: 440, owner: null },
    { name: "ノースカロライナ通り",color: "green",     price: 460, owner: null },
    { name: "共同基金",            color: "community", price: 0,   owner: null },
    { name: "ペンシルバニア通り",  color: "green",     price: 480, owner: null },
    { name: "ショートライン鉄道",  color: "railroad",  price: 200, owner: null },
    { name: "チャンス",            color: "chance",    price: 0,   owner: null },
    { name: "パークプレイス",      color: "blue",      price: 500, owner: null },
    { name: "贅沢税",              color: "tax",       price: 0,   owner: null },
    { name: "ボードウォーク",      color: "blue",      price: 520, owner: null }
  ];
}

function playerTurn() {
  if (!gameActive) return;
  const p = players[currentPlayerIndex];

  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const diceTotal = dice1 + dice2;

  // サイコロを中央に表示
  const diceArea = document.getElementById("diceArea");
  if (diceArea) {
    diceArea.textContent = `🎲${dice1} + 🎲${dice2} = ${diceTotal}`;
  }

  // 移動
  p.position = (p.position + diceTotal) % gameBoard.length;
  const cell = gameBoard[p.position];
  alert(`プレイヤー${p.id}は「${cell.name}」に到着しました。`);

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

