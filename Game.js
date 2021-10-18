const canvas = document.createElement("canvas");
canvas.width = WIDTH_SCREEN * SCALE;
canvas.height = HEIGHT_SCREEN * SCALE;
document.body.appendChild(canvas);

class Game {
  constructor() {
    this.audio = new AudioManager();
    this.score = 0;
    this.asset = new ImageManager();
    this.screen = {
      width: canvas.width,
      height: canvas.height,
    };
    this.pipes = [
      new Pipe(this, 600),
      new Pipe(this, 900),
      new Pipe(this, 1200),
      new Pipe(this, 1500),
    ];
    this.ctx = canvas.getContext("2d");
    this.running = true;
    this.game = false;
    this.base = {
      img: this.asset.base,
      vector: -2,
      width: this.asset.base.naturalWidth * SCALE,
      height: this.asset.base.naturalHeight * SCALE,
      x: 0,
      y: this.screen.height - parseFloat(this.asset.base.naturalHeight) * SCALE,
    };
    this.bird = new Bird(this);
    this.bird.setAnimationSpeed(0.3);
    this.loop();
  }
  newGame() {
    this.score = 0;
    this.pipes = [
      new Pipe(this, 600),
      new Pipe(this, 900),
      new Pipe(this, 1200),
      new Pipe(this, 1500),
    ];

    this.running = true;
    this.game = false;
    this.bird = new Bird(this);
    this.bird.setAnimationSpeed(0.3);
  }
  loop() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 20);
  }
  update() {
    if (this.running) {
      this.base.x += this.base.vector;
      if (this.base.x <= -this.base.width) this.base.x = 0;
      this.bird.update();
      this.pipes.forEach((pipe) => {
        pipe.update();
      });

      if (this.pipes[0].x <= -this.pipes[0].width) {
        this.pipes.shift();

        this.pipes.push(new Pipe(this, this.pipes[2].x + 300));
      }
      for (let i = 0; i < this.pipes.length; i++) {
        if (this.pipes[i].score()) {
          this.score++;
          this.audio.point.play();
        }
        if (this.pipes[i].collisionBird()) this.endGame();
      }
      if (this.bird.y < 0) this.endGame();

      if (this.bird.y + this.bird.sizeHeight > this.base.y) this.endGame();
    }
  }
  endGame() {
    this.running = false;
    this.audio.hit.play();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.ctx.drawImage(
      this.asset.background,
      0,
      0,
      parseInt(parseFloat(this.asset.background.naturalWidth) * SCALE),
      parseInt(parseFloat(this.asset.background.naturalHeight) * SCALE)
    );
    this.pipes.forEach((pipe) => {
      pipe.draw();
    });
    this.ctx.drawImage(
      this.base.img,
      parseInt(this.base.x),
      parseInt(this.base.y),
      parseInt(this.base.width),
      parseInt(this.base.height)
    );

    this.ctx.drawImage(
      this.base.img,
      parseInt(this.base.x + this.base.width),
      parseInt(this.base.y),
      parseInt(this.base.width),
      parseInt(this.base.height)
    );
    this.bird.draw();
    this.drawScore();
    if (this.running == false)
      this.ctx.drawImage(
        this.asset.gameOver,
        this.screen.width / 2 - (this.asset.gameOver.naturalWidth * SCALE) / 2,
        this.screen.height / 2,
        this.asset.gameOver.naturalWidth * SCALE,
        this.asset.gameOver.naturalHeight * SCALE
      );
  }
  drawScore() {
    const width = 24.0 * SCALE;
    const height = 36.0 * SCALE;
    const scoreToDraw = this.score.toString();
    const widthToDraw = parseFloat(scoreToDraw.length) * width;
    for (let i = 0; i < scoreToDraw.length; i++) {
      this.ctx.drawImage(
        this.asset.number[parseInt(scoreToDraw[i])],
        this.screen.width / 2 - widthToDraw / 2 + i * width,
        70,
        width,
        height
      );
    }
  }
}
let game = new Game();
const controll = () => {
  if (game.game == false) {
    game.game = true;
    game.audio.wing.play();
  }
  if (game.game == true) {
    game.bird.jump();
    game.audio.wing.play();
  }
  if (game.running == false) {
    game.newGame();
  }
};
window.addEventListener("keydown", (event) => {
  controll();
});
canvas.addEventListener("click", controll);
