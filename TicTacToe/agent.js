// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/trKjYdBASyQ
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

// Untuk menentukan kedalaman di suatu giliran
// Kedalaman digunakan juga dalam kalkulasi scores
let playDepth = 1;

// MINIMAX AGENT
function bestMoveMinimax(size) {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, playDepth, false, size);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  playDepth += 2;
  currentPlayer = human;
}

function minimax(board, depth, isMaximizing, size) {
  let result;
  if (size == 3) {
    result = checkWinner3();
  } else if (size == 5) {
    result = checkWinner5();
  } else if (size == 7) {
    result = checkWinner7();
  }

  if (result == 'X') {
    return scores[result] - depth;
  } else if (result == 'O') {
    return depth + scores[result];
  } else if (result == 'tie') {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false, size);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true, size);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

// AlPHA BETA PRUNING AGENT
function bestMoveAlpha(size) {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = alphaBetaPruning(board, playDepth, false, -Infinity, Infinity, size);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  playDepth += 2;
  currentPlayer = human;
}

function alphaBetaPruning(board, depth, isMaximizing, alpha, beta, size) {
  let result;
  if (size == 3) {
    result = checkWinner3();
  } else if (size == 5) {
    result = checkWinner5();
  } else if (size == 7) {
    result = checkWinner7();
  }
  
  if (result == 'X') {
    return scores[result] - depth;
  } else if (result == 'O') {
    return depth + scores[result];
  } else if (result == 'tie') {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = alphaBetaPruning(board, depth + 1, false, alpha, beta, size);
          board[i][j] = '';
          bestScore = max(score, bestScore);
          alpha = max(alpha, bestScore);
          if (bestScore >= beta){
            break;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = alphaBetaPruning(board, depth + 1, true, alpha, beta, size);
          board[i][j] = '';
          bestScore = min(score, bestScore);
          beta = min(beta, bestScore);
          if (bestScore <= alpha){
            break;
          }
        }
      }
    }
    return bestScore;
  }
}

// RANDOM AGENT
function randomAgent(size) {
  // AI to make its turn
  let moves = [];
  let move;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Ngumpulin available spot
      if (board[i][j] == '') {
        move = { i, j };
        moves.push(move);
      }
    }
  }

  // Random index
  let randomPick = moves[Math.floor(Math.random()*moves.length)];
  board[randomPick.i][randomPick.j] = ai;
  currentPlayer = human;
}
