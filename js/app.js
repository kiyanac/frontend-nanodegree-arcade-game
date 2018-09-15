class Enemy {
  constructor(x,y, speed) {
    this.x = x;
    this.y = y + 50;
    this.horizontal = 101;
    this.restart = -this.horizontal;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
      // Game speed
      if (this.x < this.horizontal * 5) {
        //move forward
        this.x += this.speed * dt;

      }else{
        //reset to starting position
        this.x = this.restart;
      }
  };

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}

class Player {
  constructor() {
    this.vertical = 83;
    this.horizontal = 101;
    this.posX = this.horizontal * 2;
    this.posY = (this.vertical * 4) + 50;
    this.x = this.posX;
    this.y = this.posY;
    this.pause = false;
    this.player = 'images/char-cat-girl.png';
  }

    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y)
}

//player movement
handleInput(input){
  if (input === 'left' && this.x > 0) {
    this.x -= this.horizontal;
  }else if (input === 'up' && this.y > 0) {
    this.y -= this.vertical;
  }else if (input === 'right' && this.x < (this.vertical * 4)) {
    this.x += this.horizontal;
  }else if (input === 'down' && this.y < (this.vertical * 4)) {
    this.y += this.vertical;
  }
}

update() {
  for(let enemy of allEnemies) {
    if (this.y === enemy.y && (enemy.x + 50 > this.x && enemy.x < this.x + 50)) {
      this.x = this.posX;
      this.y = this.posY;
      console.log('Hit');
    }
  }
  var modalHide = document.getElementById('winModal');

  // win condition
  if(this.y === -33) {
    this.x = this.posX;
    this.y = this.posY;
    winModal();
  }

    function winModal() {
      modalHide.style.display = "block";
    }

// restart button on modal
  document.querySelector('.restartBtn').addEventListener("click", () => {
    modalHide.style.display = "none";
  });

// pauseModal appears when Pause button is pressed
// Play button continues game
  var modal = document.getElementById('pauseModal');

  document.querySelector('.pauseBtn').addEventListener("click", () => {
    bug1.speed = 0;
    bug2.speed = 0;
    bug3.speed = 0;
    this.horizontal = 0;
    this.vertical = 0;
    pauseModal();
  });

  function pauseModal() {
    modal.style.display = "block";
  }
  document.querySelector('.playBtn').addEventListener("click", () => {
    bug1.speed = 150;
    bug2.speed = 50;
    bug3.speed = 100;
    this.vertical = 83;
    this.horizontal = 101;
    modal.style.display = "none";
  });
}
//
}

// Instantiate objects.
const player = new Player();
const bug1 = new Enemy((-101 * 2.5), 0, 150);
const bug2 = new Enemy(-101, 83, 50);
const bug3 = new Enemy((-101 * 2), (83 * 2), 100);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
