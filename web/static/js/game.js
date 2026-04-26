const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const turnDot = document.getElementById('turnDot');
const resetBtn = document.getElementById('resetBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

let gameState = null;
let scores = { x: 0, o: 0, draw: 0 };
let currentPlayer = 1;

async function initGame() {
    const response = await fetch('/api/state');
    gameState = await response.json();
    currentPlayer = gameState.current_player;
    updateUI();
}

async function makeMove(index) {
    if (gameState.game_over || gameState.board[index] !== 0) return;

    const response = await fetch('/api/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: index })
    });

    gameState = await response.json();
    currentPlayer = gameState.current_player;

    if (gameState.winner) scores[gameState.winner === 1 ? 'x' : 'o']++;
    else if (gameState.game_over && gameState.is_full) scores.draw++;

    updateScores();
    updateUI();
}

async function resetGame() {
    const response = await fetch('/api/reset', { method: 'POST' });
    gameState = await response.json();
    currentPlayer = gameState.current_player;
    updateUI();
}

function updateUI() {
    cells.forEach((cell, index) => {
        const value = gameState.board[index];
        const symbol = value === 1 ? 'X' : value === 2 ? 'O' : '';

        if (symbol !== cell.textContent) {
            cell.textContent = symbol;
            if (symbol) {
                cell.classList.add(symbol.toLowerCase());
            } else {
                cell.classList.remove('x', 'o');
            }
        }

        cell.classList.toggle('disabled', gameState.game_over || value !== 0);
        cell.classList.remove('winning', 'preview-x', 'preview-o');
        cell.removeAttribute('data-preview');
    });

    if (gameState.winning_cells && gameState.winning_cells.length) {
        gameState.winning_cells.forEach(i => cells[i].classList.add('winning'));
    }

    if (!gameState.game_over) {
        const previewClass = currentPlayer === 1 ? 'preview-x' : 'preview-o';
        const previewSymbol = currentPlayer === 1 ? 'X' : 'O';
        cells.forEach(cell => {
            if (!cell.textContent) {
                cell.classList.add(previewClass);
                cell.setAttribute('data-preview', previewSymbol);
            }
        });
    }

    updateStatus();
}

function updateStatus() {
    if (gameState.winner) {
        const sym = gameState.winner === 1 ? 'X' : 'O';
        statusText.textContent = `${sym} kazandı!`;
        turnDot.className = 'turn-dot win';
    } else if (gameState.is_full) {
        statusText.textContent = 'Berabere!';
        turnDot.className = 'turn-dot draw';
    } else {
        const sym = currentPlayer === 1 ? 'X' : 'O';
        statusText.textContent = `${sym}'in sırası`;
        turnDot.className = `turn-dot ${sym.toLowerCase()}`;
    }
}

function updateScores() {
    scoreX.textContent = scores.x;
    scoreO.textContent = scores.o;
    scoreDraw.textContent = scores.draw;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

resetBtn.addEventListener('click', resetGame);

initGame();
