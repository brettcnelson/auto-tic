var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
var games = [];
var leafID = 1;

function Node(p,b) {
  this.parent = p || null;
  this.board = b || {};
  this.letter = !p || p.letter === 'X' ? 'O' : 'X';
  this.pos = i || null;
  this.stats = {wins:0,losses:0,ties:0,total:0};
  this.children = [];
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
  var i = wins.filter(w=>w.every(s=>this.board[s]===this.letter));
  if (i.length) {
    this.update(i[0]);
    return true;
  }
  if (Object.keys(this.board).length === 9) {
    this.update();
    return true;
  }
};

Node.prototype.symmCheck = function(nodeBoard) {
  return this.children.every(c=>!symms.some(symm=>symm.every((s,i)=>c.board[i+1]===nodeBoard[s])));
};

Node.prototype.makeTree = function() {
  if (!this.gameOver()) {
    for (var i = 1 ; i < 10 ; i++) {
      if (!this.board[i]) {
        var testBoard = Object.assign({},this.board);
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
  games: games.slice(0,10)
}

export default data;
