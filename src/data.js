var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
var nodes = {nodes:0,nodesPlayed:0,leaves:0,leavesPlayed:0,X:0,O:0,ties:0};
var levels = {totalBoards:0};
var games = [];

function Node(p,board) {
  board = board || {};
  this.parent = p || null;
  this.boards = symms.map(symm=>symm.reduce(makeSymm.bind(this),{}));
  this.letter = !p || p.letter === 'X' ? 'O' : 'X';
  this.stats = {wins:0,losses:0,ties:0,total:0};
  this.children = [];
  function makeSymm(a,b,i) {
    board[i+1] && (a[b] = board[i+1]);
    return a;
  }
}

Node.prototype.update = function(win) {
  var cb = win ? winner.bind(this) : tieer;
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
  if (wins.some(w=>w.every(s=>this.boards[0][s]===this.letter))) {
    nodes[this.letter]++
    this.update(true);
    return true;
  }
  if (Object.keys(this.boards[0]).length === 9) {
    nodes.ties++
    this.update();
    return true;
  }
};

Node.prototype.symmCheck = function(nodeBoard) {
  return this.children.every(c=>!symms.some(symm=>symm.every((s,i)=>c.boards[0][i+1]===nodeBoard[s])));
};

Node.prototype.makeTree = function(n) {
  nodes.nodes++;
  if (this.gameOver()) {nodes.leaves++}
  else {
    for (var i = 1 ; i < 10 ; i++) {
      if (!this.boards[0][i]) {
        var testBoard = Object.assign({},this.boards[0]);
        testBoard[i] = this.letter === 'X' ? 'O' : 'X';
        this.symmCheck(testBoard) && this.children.push(new Node(this,testBoard));
      }
    }
    this.children.forEach(c=>c.makeTree(n+1));
  }
};

Node.prototype.countNodes = function(m) {
  if (!levels[m]) {levels[m] = {total:0}}
  levels[m].total++;
  if (!levels[m][this.boards.length]) {levels[m][this.boards.length] = 0}
  levels[m][this.boards.length]++;
  levels.totalBoards+=this.boards.length;
  this.children.forEach(c=>c.countNodes(m+1));
};

Node.prototype.play = function() {
  if (!this.gameOver()) {
    var nextMove = this.children.reduce(pick);
    games[games.length-1].moves.push(nextMove);
    nextMove.play();
  }
  function pick(a,b) {
    return score(b) > score(a) ? b : a;
  }
  function score(n) {
    return (n.stats.wins-n.stats.losses)/n.stats.total;
  }
};

function Game(head) {
  this.moves = [head];
}

Game.prototype.display = function(symm) {
  console.log(this.moves.length);
  this.moves.slice(1).forEach(function(m,i) {
    console.log(i+1,m.letter);
    var arr = [[1,2,3],[4,5,6],[7,8,9]];
    arr.forEach(r=>console.log(r.map(s=>m.boards[symm || 0][s]|| ' ')));
  });
};

var tree = new Node();
tree.makeTree(0);
console.log(nodes)

for (var i = 0 ; i < 10 ; i++) {
  games.push(new Game(tree));
  tree.play();
}

var data = {
  tree: tree,
  games: games
}

export default data;
