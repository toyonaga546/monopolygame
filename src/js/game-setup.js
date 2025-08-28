// game-setup.js
// 初期化と起動。例外をキャッチして画面に表示する。

window.addEventListener("DOMContentLoaded", () => {
  try {
    const pc = parseInt(localStorage.getItem("playerCount") || "3", 10);
    if (Number.isNaN(pc) || pc < 2) throw new Error("プレイヤー人数が不正です。");

    initializeGame(pc);   // ← game-core.js
    drawBoard();          // ← game-ui.js
    showReady();          // ← game-ui.js
    wireButtons();        // ← game-ui.js
  } catch (e) {
    // どこかで失敗しても必ずユーザーに見える形で表示
    try {
      showError(e);       // ← game-ui.js
    } catch {
      alert(e.message);
    }
  }
});
