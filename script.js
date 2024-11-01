const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombos) {
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }

    return boardState.includes(null) ? null : 'Tie';
};

const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');
    
    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const result = checkWinner();
    if (result) {
        if (result === 'Tie') {
            status.textContent = "It's a tie!";
        } else {
            status.textContent = `Player ${result} wins!`;
        }
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    status.textContent = "Player X's turn";

    Array.from(board.children).forEach(cell => cell.textContent = '');
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
