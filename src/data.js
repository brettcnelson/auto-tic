var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
var games = [];
var leafID = 1;

function Node(p,board) {
  board = board || {};
  this.parent = p || null;
  this.boards = symms.map(symm=>symm.reduce(makeSymm.bind(this),{}));
  this.letter = !p || p.letter === 'X' ? 'O' : 'X';
  this.pos = i || null;
  this.stats = {wins:0,losses:0,ties:0,total:0};
  this.children = [];
  function makeSymm(a,b,i) {
    board[i+1] && (a[b] = board[i+1]);
    return a;
  }
}

Node.prototype.update = function(win) {
  var cb = win ? winner.bind(this) : tieer;
  if (!this.leafID) {
    this.leafID = leafID++;
    this.res = win || 'TIE!';
  }
  var node = this;
  while (node) {
    cb(node);
    node.stats.total++;
    node = node.parent;
  }
  function winner(node) {
    node.letter === this.letter ? node.stats.wins++ : node.stats.losses++;
  }
  function tieer(node) {
    node.stats.ties++;
  }
};

Node.prototype.gameOver = function() {
  var i = wins.filter(w=>w.every(s=>this.boards[0][s]===this.letter));
  if (i.length) {
    this.update(i[0]);
    return true;
  }
  if (Object.keys(this.boards[0]).length === 9) {
    this.update();
    return true;
  }
};

Node.prototype.symmCheck = function(nodeBoard) {
  return this.children.every(c=>!symms.some(symm=>symm.every((s,i)=>c.boards[0][i+1]===nodeBoard[s])));
};

Node.prototype.makeTree = function() {
  if (!this.gameOver()) {
    for (var i = 1 ; i < 10 ; i++) {
      if (!this.boards[0][i]) {
        var testBoard = Object.assign({},this.boards[0]);
        testBoard[i] = this.letter === 'X' ? 'O' : 'X';
        this.symmCheck(testBoard) && this.children.push(new Node(this,testBoard,i));
      }
    }
    this.children.forEach(c=>c.makeTree());
  }
};

Node.prototype.play = function() {
  games[games.length-1].moves.push(Object.assign({},this));
  if (!this.gameOver()) {
    var nextMove = this.children.reduce(pick);
    nextMove.play();
  }
  else {
    games[games.length-1].leafID = this.leafID;
    games[games.length-1].res = Array.isArray(this.res) ? this.letter : 'TIE';
  }
  function pick(a,b) {
    return score(b) > score(a) ? b : a;
  }
  function score(n) {
    return (n.stats.wins-n.stats.losses)/n.stats.total;
  }
};

function Game() {
  this.moves = [];
}

var tree = new Node();
tree.makeTree();


for (var i = 0 ; i < 16889 ; i++) {
  games.push(new Game());
  tree.play();
}

var data = {
  tree: tree,
  games: games.slice(-10)
}

export default data;
