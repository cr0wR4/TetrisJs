import { Game } from './game.js';
import { COLORS } from './pieces.js';
const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');
const nextCanvas = document.querySelector('#next');
const nextCtx = nextCanvas.getContext('2d');
const scoreEl = document.querySelector('#score');
const linesEl = document.querySelector('#lines');
const levelEl = document.querySelector('#level');
const statusEl = document.querySelector('#status');
const SIZE = 30;
function drawCell(context, x, y, color, size = SIZE) {
  context.fillStyle = color;
  context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
}
function render() {
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.board.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) drawCell(ctx, x, y, COLORS[cell]);
  }));
  game.shape.forEach((row, dy) => row.forEach((cell, dx) => {
    if (cell) drawCell(ctx, game.x + dx, game.y + dy, COLORS[cell]);
  }));
  nextCtx.fillStyle = '#111827';
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  game.next.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) drawCell(nextCtx, x + 1, y + 1, COLORS[cell], 24);
  }));
  scoreEl.textContent = game.score;
  linesEl.textContent = game.lines;
  levelEl.textContent = game.level;
  statusEl.textContent = game.over ? 'Fim de jogo! Reinicie para jogar novamente.' : game.paused ? 'Pausado' : 'Jogando';
}
const game = new Game(render, score => {
  localStorage.setItem('tetris-last-score', String(score));
  // Integração com /api/scores será habilitada após login e CSRF.
  game.reset();
});
let last = 0;
let elapsed = 0;
function frame(time) {
  const delta = Math.min(time - (last || time), 1000);
  last = time;
  if (!game.paused && !game.over) {
    elapsed += delta;
    if (elapsed >= game.interval) {
      game.drop();
      elapsed = 0;
    }
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
function action(key) {
  if (key === 'ArrowLeft') game.move(-1);
  else if (key === 'ArrowRight') game.move(1);
  else if (key === 'ArrowDown') game.drop();
  else if (key === 'ArrowUp') game.turn();
  else if (key === ' ') game.hardDrop();
  else if (key.toLowerCase() === 'p') game.togglePause();
}
document.addEventListener('keydown', event => {
  if (['ArrowLeft','ArrowRight','ArrowDown','ArrowUp',' '].includes(event.key)) event.preventDefault();
  action(event.key);
});
document.querySelector('#restart').addEventListener('click', () => { elapsed = 0; game.reset(); });
document.querySelector('#pause').addEventListener('click', () => game.togglePause());
document.querySelectorAll('[data-key]').forEach(button => button.addEventListener('click', () => action(button.dataset.key)));
