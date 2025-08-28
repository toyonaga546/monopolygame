// game-ui.js
// 11×11 単一グリッドに周囲40マスを配置。スキマ無し。

function safeGet(id){ const el=document.getElementById(id); if(!el) throw new Error(`#${id} が見つかりません`); return el; }

function drawBoard(){
  if(!Array.isArray(gameBoard) || gameBoard.length!==40) throw new Error("gameBoard 未初期化");

  const board = safeGet("monopolyBoard");
  board.innerHTML = "";

  // 中央パネルを先に配置（2..10×2..10）
  const center = document.createElement("div");
  center.className = "center";
  center.textContent = "MONOPOLY";
  board.appendChild(center);

  // 40マスを 11×11 外周にマッピング
  for(let i=0;i<40;i++){
    const {col,row} = indexToGrid(i);
    const cellData = gameBoard[i];
    const div = document.createElement("div");
    div.className = `cell ${cellData.color}`;
    div.style.gridColumn = `${col} / ${col+1}`;
    div.style.gridRow = `${row} / ${row+1}`;
    div.title = cellData.name;
    div.textContent = cellData.name;

    // プレイヤーマーカー
    const holder = document.createElement("div");
    holder.className = "player-marker";
    // プレイヤーマーカー
    players.forEach(p=>{
    if(!p.isBankrupt && p.position===i){
        const marker = document.createElement("div");
        marker.className = `player-marker p${p.id}`;
        marker.textContent = p.id; // 中に番号
        div.appendChild(marker);
    }
    });
    div.appendChild(holder);

    board.appendChild(div);
  }

  updatePlayersPanel();
  updateTurnLabel();
}

// インデックス→グリッド座標（1始まり）
// 角は 0(1,1) / 10(11,1) / 20(11,11) / 30(1,11)
function indexToGrid(idx){
  if(idx>=0 && idx<=10){           // 上辺 左→右
    return { col: 1+idx, row: 1 };
  }else if(idx>=11 && idx<=19){    // 右辺 上→下
    return { col: 11, row: 1+(idx-10) };
  }else if(idx>=20 && idx<=30){    // 下辺 右→左
    return { col: 11-(idx-20), row: 11 };
  }else{                           // 左辺 下→上（31..39）
    return { col: 1, row: 11-(idx-30) };
  }
}

function updatePlayersPanel(){
  const root = safeGet("players");
  root.innerHTML="";
  players.forEach((p,idx)=>{
    const d=document.createElement("div");
    const own=p.properties.map(pr=>pr.name).join(", ")||"なし";
    d.textContent=`プレイヤー${p.id}: ${p.money}万円 / 所有: ${own}`;
    if(idx===currentPlayerIndex){ d.style.fontWeight="bold"; d.style.color="#3498db"; }
    root.appendChild(d);
  });
}
function updateTurnLabel(){
  const t=safeGet("currentTurn");
  const pid=players[currentPlayerIndex]?.id ?? "?";
  t.textContent=`現在のプレイヤー：プレイヤー${pid}`;
}

function wireButtons(){
  const roll=safeGet("rollDiceBtn");
  roll.addEventListener("click", ()=>{
    try{ playerTurn(); drawBoard(); }catch(e){ showError(e); }
  });

  safeGet("buyPropertyBtn").addEventListener("click", ()=>alert("購入処理は後で実装します。"));
  safeGet("passBtn").addEventListener("click", ()=>alert("パス処理は後で実装します。"));
  safeGet("negotiateBtn").addEventListener("click", ()=>alert("交渉UIは後で実装します。"));
}

function showReady(){ const s=safeGet("status"); const b=safeGet("boardArea"); s.textContent="準備完了！"; b.classList.remove("hidden"); }
function showError(err){ const s=document.getElementById("status"); if(s){ s.textContent=`エラー: ${err.message}`; s.style.color="#c0392b"; s.style.fontWeight="700"; } else { alert(err.message); } }
