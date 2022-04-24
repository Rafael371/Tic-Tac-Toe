function checkWinner3() {

  // Check
  for (let i = 0; i < 3; i++) {
    // Horizontal
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      return board[i][0];
    }

    // Vertical
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      return board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    return board[0][0];
  } else if (equals3(board[2][0], board[1][1], board[0][2])) {
    return board[2][0];
  }

  if (checkDraw(board.length)) {
    return 'tie';
  }

}

function checkWinner5() {

  // Check
  for (let i = 0; i < 5; i++) {
    // Horizontal
    if (equals5(board[i][0], board[i][1], board[i][2], board[i][3], board[i][4])) {
      return board[i][0];
    }

    // Vertical
    if (equals5(board[0][i], board[1][i], board[2][i], board[3][i], board[4][i])) {
      return board[0][i];
    }
  }

  // Diagonal
  if (equals5(board[0][0], board[1][1], board[2][2], board[3][3], board[4][4])) {
    return board[0][0];
  } else if (equals5(board[4][0], board[3][1], board[2][2], board[1][3], board[0][4])) {
    return board[4][0];
  }

  if (checkDraw(board.length)) {
    return 'tie';
  }

}

function checkWinner7() {

  // Check
  for (let i = 0; i < 7; i++) {
    for (let j= 0; j < 3; j++){
      // Horizontal
      if (equals5(board[i][0+j], board[i][1+j], board[i][2+j], board[i][3+j],board[i][4+j])) {
        return board[i][0+j];
      }

      // Vertical
      if (equals5(board[0+j][i], board[1+j][i], board[2+j][i], board[3+j][i], board[4+j][i])) {
        return board[0+j][i];
      }
    }
  }

  // Diagonal kiri-atas  =>  kanan-bawah '\'
  // pojok
  for (let n = 0; n < 3; n++) {
    if (equals5(board[0+n][0+n], board[1+n][1+n], board[2+n][2+n], board[3+n][3+n], board[4+n][4+n])) {
      return board[0+n][0+n];
    }
  }
  // bukan pojok
  for (let m = 1; m < 3; m++) { // loop untuk iter
    for (let n = 0; n < 3 - m; n++) { // loop untuk posibilitas
      // ke kanan
      if (equals5(board[0+n][0+m+n], board[1+n][1+m+n], board[2+n][2+m+n], board[3+n][3+m+n], board[4+n][4+m+n])) {
        return board[0+n][0+m+n];
      }
      // ke bawah
      if (equals5(board[0+m+n][0+n], board[1+m+n][1+n], board[2+m+n][2+n], board[3+m+n][3+n], board[4+m+n][4+n])) {
        return board[0+m+n][0+n];
      }
    }
  }
  
  // Diagonal kiri-bawah  =>  kanan-atas '/'
  // pojok
  for (let n = 0; n < 3; n++) {
    if (equals5(board[6-n][0+n], board[5-n][1+n], board[4-n][2+n], board[3-n][3+n], board[2-n][4+n])) {
      return board[6-n][0+n];
    }
  }
  // bukan pojok
  for (let m = 1; m < 3; m++) { // loop untuk iter
    for (let n = 0; n < 3 - m; n++) { // loop untuk posibilitas
      // ke kanan
      if (equals5(board[6-n][0+m+n], board[5-n][1+m+n], board[4-n][2+m+n], board[3-n][3+m+n], board[2-n][4+m+n])) {
        return board[6-n][0+m+n];
      }
      // ke atas
      if (equals5(board[6-m-n][0+n], board[5-m-n][1+n], board[4-m-n][2+n], board[3-m-n][3+n], board[2-m-n][4+n])) {
        return board[6-m-n][0+n];
      }
    }
  }

  if (checkDraw(board.length)) {
    return 'tie';
  }

}
  
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function equals5(a, b, c, d, e) {
  return a == b && b == c && c == d && d == e && a != '';
}

function checkDraw(size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == '') {
        return false;
      }
    }
  }
  return true;
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      
      if (localStorage.getItem('agent') == 'random') {
        randomAgent(board.length);
      } else if (localStorage.getItem('agent') == 'minimax') {
        bestMoveMinimax(board.length);
      } else if (localStorage.getItem('agent') == 'alphabeta') {
        bestMoveAlpha(board.length);
      }
    }
  }
}
