import { createBoard, COLS, collides, merge, clearLines } from './board.js';
import { randomPiece, rotate } from './pieces.js';
export class Game {
  constructor(onChange, onGameOver) {
    this.onChange = onChange;
    this.onGameOver = onGameOver;
  }
  reset() {
    this.board = createBoard();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.over = false;
    this.paused = false;
    this.next = randomPiece();
    this.spawn();
    this.onChange();
  }
  spawn() {
    this.shape = this.next;
    this.next = randomPiece();
    this.x = Math.floor((COLS - this.shape[0].length) / 2);
    this.y = 0;
    if (collides(this.board, this.shape, this.x, this.y)) {
      this.over = true;
      this.onGameOver(this.score);
    }
  }
  move(dx) {
    if (this.over || this.paused) return;
    if (!collides(this.board, this.shape, this.x + dx, this.y)) this.x += dx;
    this.onChange();
  }
  turn() {
    if (this.over || this.paused) return;
    const rotated = rotate(this.shape);
    for (const offset of [0, -1, 1, -2, 2]) {
      if (!collides(this.board, rotated, this.x + offset, this.y)) {
        this.shape = rotated;
        this.x += offset;
        break;
      }
    }
    this.onChange();
  }
  drop() {
    if (this.over || this.paused) return;
    if (!collides(this.board, this.shape, this.x, this.y + 1)) {
      this.y++;
    } else {
      merge(this.board, this.shape, this.x, this.y);
      const cleared = clearLines(this.board);
      this.score += [0, 100, 300, 500, 800][cleared] * this.level;
      this.lines += cleared;
      this.level = 1 + Math.floor(this.lines / 10);
      this.spawn();
    }
    this.onChange();
  }
  hardDrop() {
    if (this.over || this.paused) return;
    while (!collides(this.board, this.shape, this.x, this.y + 1)) {
      this.y++;
      this.score += 2;
    }
    this.drop();
  }
  togglePause() {
    if (this.over) return;
    this.paused = !this.paused;
    this.onChange();
  }
  get interval() { return Math.max(100, 800 * Math.pow(0.82, this.level - 1)); }
}
