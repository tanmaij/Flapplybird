class Bird {
  constructor(game) {
    this.game = game;
    this.vY = 0;
    this.angle = 0;
    this.img = this.game.asset.bird;
    this.animationSpeed = 0.0;
    this.animationState = 0.0;
    this.sizeWidth = BIRD_SIZE_WIDTH * SCALE;
    this.sizeHeight = BIRD_SIZE_HEIGHT * SCALE;
    this.x = this.game.screen.width / 2.0 - this.sizeWidth / 2.0;
    this.y = this.game.screen.height / 2.0 - this.sizeHeight / 2.0;
  }
  update() {
    this.animationState += this.animationSpeed;
    if (this.animationState >= 3) this.animationState = 0;
    if (this.game.game == true) {
      this.vY += 0.7;
      if (this.vY >= 15) {
        this.game.audio.swoosh.play();
        this.vY = 15;
      }

      if (this.vY > 0) this.angle += 5;
      else this.angle -= 5;

      this.fixAngle();
      this.y += this.vY;
    }
  }
  jump() {
    this.vY = -11;
  }
  fixAngle() {
    if (this.angle <= -30) this.angle = -30;
    if (this.angle >= 30) this.angle = 30;
  }
  draw() {
    const ctx = this.game.ctx;
    ctx.translate(
      parseInt(this.x + this.sizeWidth / 2),
      parseInt(this.y + this.sizeHeight / 2)
    );
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.translate(
      -parseInt(this.x + this.sizeWidth / 2),
      -parseInt(this.y + this.sizeHeight / 2)
    );

    ctx.drawImage(
      this.img[parseInt(this.animationState)],
      parseInt(this.x),
      parseInt(this.y),
      parseInt(this.sizeWidth),
      parseInt(this.sizeHeight)
    );
    ctx.translate(
      parseInt(this.x + this.sizeWidth / 2),
      parseInt(this.y + this.sizeHeight / 2)
    );
    ctx.rotate(-(this.angle * Math.PI) / 180);
    ctx.translate(
      -parseInt(this.x + this.sizeWidth / 2),
      -parseInt(this.y + this.sizeHeight / 2)
    );
  }
  setAnimationSpeed(speed) {
    this.animationSpeed = speed;
  }
}
