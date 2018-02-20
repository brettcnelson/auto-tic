var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
var games = [];
var random = [];
var leafID = 1;

function Node(p,b) {
  this.parent = p || null;
  this.letter = !p || p.letter === 'X' ? 'O' : 'X';
  this.stats = {wins:0,losses:0,ties:0,total:0};
  this.children = [];
  this.boards = [];
  this.boards[0] = b || {}; 
  for (var i = 1 ; i < 8 ; i++) {
    this.boards[i] = {};
    for (var key in b) {
      this.boards[i][symms[i].indexOf(Number(key))+1] = b[key];
    }
  } 
}

Node.prototype.makeTree = function() {
  if (!this.gameOver(true)) {
    for (var s = 1 ; s < 10 ; s++) {
      if (!this.boards[0][s]) {
        var testBoard = Object.assign({},this.boards[0]);
        testBoard[s] = this.letter === 'X' ? 'O' : 'X';
        if (!this.children.some(childSymm)) {
          this.children.push(new Node(this,testBoard));
        }
      }
    }
    this.children.forEach(c=>c.makeTree());
  }
  function childSymm(c) {
    return symms.slice(1).some(symm=>symm.every((s,i)=>testBoard[s]===c.boards[0][i+1]));
  }
};

Node.prototype.update = function(win,rand) {
  var cb = win ? winner.bind(this) : tieer;
  var node = this;
  while (node) {
    cb.call(this,node);
    node.stats.total++;
    node = node.parent;
  }
  function winner(node) {
    if (rand) {tree.call(this,node)}
    node.letter === this.letter ? node.stats.wins++ : node.stats.losses++;
  }
  function tieer(node) {
    if (rand) {tree.call(this,node)}
    node.stats.ties++;
  }
  function tree(node) {
    if (node === this) {
      this.leafID = leafID++;
      this.res = win || 'TIE!';
      random.push(new Game());
      random[random.length-1].leafID = this.leafID;
      random[random.length-1].res = Array.isArray(this.res) ? this.letter : 'tie';
      if (Array.isArray(this.res)) {
        this.res = symms.map(symm=>win.map(w=>w.map(s=>symm.indexOf(s)+1)));
      }
    }
    var newMove = Object.assign({},node,{stats:{},parent:undefined});
    for (var key in node.stats) {
      newMove.stats[key] = node.stats[key];
    }
    random[random.length-1].moves.push(newMove);
    if (!node.parent) {
      random[random.length-1].moves.reverse();
    }
  }
};

Node.prototype.gameOver = function() {
  var i = wins.filter(w=>w.every(s=>this.boards[0][s]===this.letter));
  if (i.length) {
    this.update(i,true);
    return true;
  }
  if (Object.keys(this.boards[0]).length === 9) {
    this.update(null,true);
    return true;
  }
};

Node.prototype.play = function() {
  var newMove = Object.assign({},this,{stats:{},parent:undefined});
  for (var key in this.stats) {
    newMove.stats[key] = this.stats[key];
  }
  games[games.length-1].moves.push(newMove);
  if (!this.res) {
    var nextMove = this.children.reduce(pick);
    nextMove.play();
  }
  else {
    this.update(Array.isArray(this.res) && this.res);
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

for (var j = 0 ; j < 16889 ; j++) {
  games.push(new Game());
  tree.play();
}

function updateTree(node) {
  node.update(Array.isArray(node.res) && node.res);
}

var data = {
  games: games,
  all: random
}

module.exports = {
  tree: tree,
  data: data,
  updateTree: updateTree
};
