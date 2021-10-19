class Pipe {
  constructor(game, x) {
    this.y =
      HEIGHT_SCREEN *
      SCALE *
      (parseFloat(Math.floor(Math.random() * 35) + 10) / 100);

    this.game = game;
    this.x = x;
    this.space = 80.0 * SCALE + 33.5;
    this.img = this.game.asset.pipe;
    this.width = parseFloat(this.img.naturalWidth) * SCALE;
    this.height = parseFloat(this.img.naturalHeight) * SCALE;
    this.scoreTrue = true;
  }
  update() {
    if (this.game.game) this.x += -SPEED;
  }
  draw() {
    const ctx = this.game.ctx;
    ctx.drawImage(
      this.img,
      parseInt(this.x),
      parseInt(this.y + this.space),
      parseInt(this.width),
      parseInt(this.height)
    );
    ctx.translate(
      parseInt(this.x + this.width / 2),
      parseInt(this.y - this.height / 2)
    );
    ctx.rotate((180 * Math.PI) / 180);
    ctx.translate(
      -parseInt(this.x + this.width / 2),
      -parseInt(this.y - this.height / 2)
    );

    ctx.drawImage(
      this.img,
      parseInt(this.x),
      parseInt(this.y - this.height),
      parseInt(this.width),
      parseInt(this.height)
    );
    ctx.translate(
      parseInt(this.x + this.size / 2),
      parseInt(this.y + this.size / 2)
    );
    ctx.rotate(-(this.angle * Math.PI) / 180);
    ctx.translate(
      parseInt(this.x + this.width / 2),
      parseInt(this.y - this.height / 2)
    );
    ctx.rotate((-180 * Math.PI) / 180);
    ctx.translate(
      -parseInt(this.x + this.width / 2),
      -parseInt(this.y - this.height / 2)
    );
  }
  collisionBird() {
    const x = this.game.bird.x;
    const width = this.game.bird.sizeWidth;
    const y = this.game.bird.y;
    const height = this.game.bird.sizeHeight;
    if (x + width > this.x && x < this.x + this.width) {
      if (y < this.y || y + height > this.y + this.space) return true;
    }
    return false;
  }
  score() {
    const x = this.game.bird.x;
    const width = this.game.bird.sizeWidth;
    if (x + width / 2 > this.x + this.width / 2) {
      if (this.scoreTrue) {
        this.scoreTrue = false;
        return true;
      }
    }
    return false;
  }
}
