var Local = function() {
  //game object
  var game;
  //Time Interval
  var INTERVAL = 300;
  var timer = null;
  //Time Up
  var timeCount = 0;
  var time = 0;
  //bond keyboard event
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if(e.keyCode == 38) { //up
        game.rotate();
      } else if(e.keyCode == 39) { //right
        game.right();
      } else if(e.keyCode == 40) { //down
        game.down();
      } else if(e.keyCode == 37) { //left
        game.left();
      } else if(e.keyCode == 32) { //space
        game.fall();
    }
  }
}

  //move
  var move = function() {
    timeFunc();
    if(!game.down()) {
      game.fixed();
      var line = game.checkClear();
      if(line) {
        game.addScore(line);
      }
      var gameOver = game.checkGameOver();
      if(gameOver) {
        stop();
        alert('GameOver! Want Another Round?');
        start();
      }else {
        game.performNext(generateType(), generateDir());
      }
    }
  }
  //Random Line
  var generateBottomLine = function(lineNum) {
    var lines = [];
    for(var i=0; i<lineNum; i++) {
      var line = [];
      for(var j=0; j<10; j++) {
        line.push(Math.ceil(Math.random()*2)-1);
      }
      lines.push(line);
    }
    return lines;
  }
  //Timer function
  var timeFunc = function() {
    timeCount = timeCount + 1;
    if(timeCount ==5) {
      timeCount = 0;
      time =time + 1;
      game.setTime(time);
      if(time % 20 ==0) {
        game.addTailLines(generateBottomLine(1));
      }
    }
  }
  //Random Square
  var generateType = function() {
    return Math.ceil(Math.random() * 7) -1;
  }
  //Random Rotation
  var generateDir = function() {
    return Math.ceil(Math.random() * 4) -1;
  }
  //start
  var start = function() {
    timeCount = 0;
    time = 0;
    var doms = {
      gameDiv: document.getElementById('local_game'),
      nextDiv: document.getElementById('local_next'),
      timeDiv: document.getElementById('local_time'),
      scoreDiv: document.getElementById('local_score'),
      resultDiv: document.getElementById('local_gameover')
    }
    game = new Game();
    game.init(doms,generateType(), generateDir());
    game.setTime(time);
    game.setScore(0);
    bindKeyEvent();
    game.performNext(generateType(), generateDir());
    timer = setInterval(move, INTERVAL);
  }
  //GameOver
  var stop =function() {
    if(timer) {
      clearInterval(timer);
      timer = null;
    }
    document.onkeydown =null;
  }
  //export API
  this.start = start;
}
