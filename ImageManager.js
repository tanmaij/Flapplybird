class ImageManager {
  constructor() {
    this.bird = [
      this.getImage("#bird-1"),
      this.getImage("#bird-2"),
      this.getImage("#bird-3"),
    ];

    this.pipe = this.getImage("#pipe");
    this.number = [
      this.getImage("#number-0"),
      this.getImage("#number-1"),
      this.getImage("#number-2"),
      this.getImage("#number-3"),
      this.getImage("#number-4"),
      this.getImage("#number-5"),
      this.getImage("#number-6"),
      this.getImage("#number-7"),
      this.getImage("#number-8"),
      this.getImage("#number-9"),
    ];
    this.background = this.getImage("#background");
    this.base = this.getImage("#base");
    this.gameOver = this.getImage("#game-over");
  }
  getImage(id) {
    return document.querySelector(id);
  }
}
