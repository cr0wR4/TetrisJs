export const SHAPES = [
  [[1,1,1,1]],
  [[2,2],[2,2]],
  [[0,3,0],[3,3,3]],
  [[0,4,4],[4,4,0]],
  [[5,5,0],[0,5,5]],
  [[6,0,0],[6,6,6]],
  [[0,0,7],[7,7,7]]
];
export const COLORS = ['#111827','#22d3ee','#facc15','#a78bfa','#4ade80','#fb7185','#60a5fa','#fb923c'];
export function randomPiece() {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  return shape.map(row => [...row]);
}
export function rotate(shape) {
  return shape[0].map((_, col) => shape.map(row => row[col]).reverse());
}
