var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
var games = [];
var rand = [];
var leafID = 1;

function Node(p,b,i) {
  this.parent = p || null;
  this.board = b || {};
  this.letter = !p || p.letter === 'X' ? 'O' : 'X';
  this.pos = i || null;
  this.stats = {wins:0,losses:0,ties:0,total:0};
  this.children = [];
}

Node.prototype.update = function(win,rando) {
  var cb = win ? winner.bind(this) : tieer;
  if (!this.leafID) {
    this.leafID = leafID++;
    this.res = win || 'TIE!';
  }
  var node = this;
  while (node) {
    cb.call(this,node);
    node.stats.total++;
    node = node.parent;
  }
  function winner(node) {
    if (rando) {tree.call(this,node)}
    node.letter === this.letter ? node.stats.wins++ : node.stats.losses++;
  }
  function tieer(node) {
    if (rando) {tree.call(this,node)}
    node.stats.ties++;
  }
  function tree(node) {
    if (node === this) {
      rand.push(new Game());
      rand[rand.length-1].leafID = this.leafID;
      rand[rand.length-1].res = Array.isArray(this.res) ? this.letter : 'tie';
    }
    var newMove = Object.assign({},node,{stats:{},parent:undefined});
    for (var key in node.stats) {
      newMove.stats[key] = node.stats[key];
    }
    rand[rand.length-1].moves.push(newMove);
    if (!node.parent) {
      rand[rand.length-1].moves.reverse();
    }
  }
};

Node.prototype.gameOver = function(rand) {
  var i = wins.filter(w=>w.every(s=>this.board[s]===this.letter));
  if (i.length) {
    this.update(i,rand);
    return true;
  }
  if (Object.keys(this.board).length === 9) {
    this.update(null,rand);
    return true;
  }
};

Node.prototype.symmCheck = function(nodeBoard) {
  return this.children.every(c=>!symms.some(symm=>symm.every((s,i)=>c.board[i+1]===nodeBoard[s])));
};

Node.prototype.makeTree = function() {
  if (!this.gameOver(true)) {
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
  var newMove = Object.assign({},this,{stats:{},parent:undefined});
  for (var key in this.stats) {
    newMove.stats[key] = this.stats[key];
  }
  games[games.length-1].moves.push(newMove);
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

var tree = new Node();
tree.makeTree();

function Game() {
  this.moves = [];
}

for (var j = 0 ; j < 16889 ; j++) {
  games.push(new Game());
  tree.play();
}

var data = {
  tree: tree,
  games: games,
  all: rand
}

export default data;
