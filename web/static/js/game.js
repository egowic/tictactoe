const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let gameState = null;

async function initGame() {
    const response = await fetch('/api/state');
    gameState = await response.json();
    updateUI();
}

async function makeMove(index) {
    if (gameState.game_over || gameState.board[index] !== 0) {
        return;
    }

    const response = await fetch('/api/move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ position: index })
    });

    gameState = await response.json();
    updateUI();
}

async function resetGame() {
    const response = await fetch('/api/reset', {
        method: 'POST'
    });

    gameState = await response.json();
    updateUI();
}

function updateUI() {
    // Update cells
    cells.forEach((cell, index) => {
        const value = gameState.board[index];
        cell.textContent = value === 1 ? 'X' : value === 2 ? 'O' : '';

        if (gameState.game_over) {
            cell.classList.add('disabled');
        } else {
            cell.classList.remove('disabled');
        }
    });

    // Update status
    if (gameState.winner) {
        const winnerSymbol = gameState.winner === 1 ? 'X' : 'O';
        status.textContent = `🎉 ${winnerSymbol} oyuncusu kazandı!`;
    } else if (gameState.is_full) {
        status.textContent = '🤝 Oyun berabere bitti!';
    } else {
        const playerSymbol = gameState.current_player === 1 ? 'X' : 'O';
        status.textContent = `${playerSymbol} oyuncusu hamle yap`;
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

resetBtn.addEventListener('click', resetGame);

// Initialize game on page load
initGame();
