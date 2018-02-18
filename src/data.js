var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var symms = [[1,2,3,4,5,6,7,8,9],[7,4,1,8,5,2,9,6,3],[9,8,7,6,5,4,3,2,1],[3,6,9,2,5,8,1,4,7],[3,2,1,6,5,4,9,8,7],[9,6,3,8,5,2,7,4,1],[7,8,9,4,5,6,1,2,3],[1,4,7,2,5,8,3,6,9]];
var games = [];
var random = [];
var leafID = 1;

function Node(p,b,m,s) {
  this.parent = p || null;
  this.letter = !p || p.letter === 'X' ? 'O' : 'X';
  this.moves = m || null;
  this.symms = s || null;
  this.board = b || {};
  this.stats = {wins:0,losses:0,ties:0,total:0};
  this.children = [];
}

Node.prototype.update = function(win,rand) {
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
    if (rand) {tree.call(this,node)}
    node.letter === this.letter ? node.stats.wins++ : node.stats.losses++;
  }
  function tieer(node) {
    if (rand) {tree.call(this,node)}
    node.stats.ties++;
  }
  function tree(node) {
    if (node === this) {
      random.push(new Game());
      random[random.length-1].leafID = this.leafID;
      random[random.length-1].res = Array.isArray(this.res) ? this.letter : 'tie';
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

Node.prototype.makeTree = function() {
  if (!this.gameOver(true)) {
    for (var s = 1 ; s < 10 ; s++) {
      if (!this.board[s]) {
        var testBoard = Object.assign({},this.board);
        testBoard[s] = this.letter === 'X' ? 'O' : 'X';
        var childMoves = [0];
        var childSymms = {}
        childSymms[0] = [s];
        var child = false;
        symms.slice(1).forEach(makeSymms.bind(this));
        if (child) {
          child.moves[s] = childMoves;
          for (var key in childSymms) {
            if (!child.symms[key]) {
              child.symms[key] = [];
            }
            child.symms[key] = child.symms[key].concat(childSymms[key]);
          }
        }
        else {
          var moves = {};
          moves[s] = childMoves;
          this.children.push(new Node(this,testBoard,moves,childSymms));
        }
      }
    }
    this.children.forEach(c=>c.makeTree());

    function makeSymms(symm,i) {
      if (!child) {
        for (var l = 0 ; l < this.children.length && !child ; l++) {
          if (symm.every(findChild.bind(this))) {
            child = this.children[l];
          }
        }
      }
      if (symm.every(findBoards)) {
        childMoves.push(i+1);
        childSymms[i+1] = [s];
      }
      function findChild(s,k) {
        return this.children[l].board[k+1]===testBoard[s];
      }
      function findBoards(s,k) {
       return testBoard[s]===testBoard[k+1];
      }
    }
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

console.log(tree)

function Game() {
  this.moves = [];
}

for (var j = 0 ; j < 16889 ; j++) {
  games.push(new Game());
  tree.play();
}

var data = {
  games: games,
  all: random
}

module.exports = {
  tree: tree,
  data: data,
  symms : symms
};
