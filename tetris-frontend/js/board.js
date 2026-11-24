export const ROWS = 20;
export const COLS = 10;
export function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}
export function collides(board, shape, x, y) {
  return shape.some((row, dy) => row.some((cell, dx) => {
    if (!cell) return false;
    const bx = x + dx, by = y + dy;
    return bx < 0 || bx >= COLS || by >= ROWS || (by >= 0 && board[by][bx] !== 0);
  }));
}
export function merge(board, shape, x, y) {
  shape.forEach((row, dy) => row.forEach((cell, dx) => {
    if (cell && y + dy >= 0) board[y + dy][x + dx] = cell;
  }));
}
export function clearLines(board) {
  let count = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(Boolean)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      count++;
      y++;
    }
  }
  return count;
}
