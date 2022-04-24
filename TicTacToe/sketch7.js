// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

// let board = [
//   ['', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', '']
// ];

let board = [
  ['X', 'O', 'O', '', 'O', 'O', 'O'],
  ['X', 'X', 'X', '', 'X', 'X', 'X'],
  ['O', 'X', 'X', '', 'O', 'X', 'O'],
  ['O', 'O', 'X', 'O', 'X', 'X', ''],
  ['X', 'O', 'X', 'O', '', 'O', 'O'],
  ['O', '', 'O', 'X', '', '', 'X'],
  ['O', 'X', 'X', 'X', '', 'O', '']
];

let w; // = width / 7;
let h; // = height / 7;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(400, 400);
  w = width / 7;
  h = height / 7;
  
  // if (localStorage.getItem('agent') == 'random') {
  //   randomAgent(board.length);
  // } else if (localStorage.getItem('agent') == 'minimax') {
  //   bestMoveMinimax(board.length);
  // } else if (localStorage.getItem('agent') == 'alphabeta') {
  //   bestMoveAlpha(board.length);
  // }
}

function draw() {
  background(255);
  strokeWeight(4);

  // Garis Vertical
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(w * 3, 0, w * 3, height);
  line(w * 4, 0, w * 4, height);
  line(w * 5, 0, w * 5, height);
  line(w * 6, 0, w * 6, height);

  // Garis Horizontal
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  line(0, h * 3, width, h * 3);
  line(0, h * 4, width, h * 4);
  line(0, h * 5, width, h * 5);
  line(0, h * 6, width, h * 6);

  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 7; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
  
  let result = checkWinner7();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
