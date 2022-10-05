//TODO eslint

export type X = number;
export type Y = number;

export const X = 0;
export const Y = 1;

export type Position = readonly [X, Y];
export type Offset = Position;

export const position = (x: X, y: Y): Position => [x, y];
export const offset = (x: X, y: Y): Offset => [x, y];

// const POSSIBLE_MOVES_OFFSETS = [
//   offset(1, 0),
//   offset(-1, 0),
//   offset(0, 1),
//   offset(0, -1),
// ];
//
// export const possibleMoves = (from: Position): Position[] => {
//   return POSSIBLE_MOVES_OFFSETS.map((offset) =>
//     position(from[X] + offset[X], from[Y] + offset[Y])
//   );
// };
//
// const VISIBLE_AREA_OFFSETS = [
//   offset(1, 1),
//   offset(1, -1),
//   offset(-1, 1),
//   offset(-1, -1),
// ];
//
// export const visibleArea = (from: Position): Position[] => {
//   return VISIBLE_AREA_OFFSETS.map((offset) =>
//     position(from[X] + offset[X], from[Y] + offset[Y])
//   );
// };

const WALKABLE_AREA_OFFSETS = [
  offset(-1, 0),
  offset(0, -1),
  offset(1, 0),
  offset(0, 1),
];

export const walkableFrom = (from: Position): Position[] =>
  WALKABLE_AREA_OFFSETS.map((offset) => [
    from[X] + offset[X],
    from[Y] + offset[Y],
  ]);

const SURROUNDING_AREA_OFFSETS = [
  //walkable area
  ...WALKABLE_AREA_OFFSETS,
  //visible corners
  offset(-1, -1),
  offset(1, -1),
  offset(1, 1),
  offset(-1, 1),
];

export const squareAround = (position: Position): Position[] => {
  return SURROUNDING_AREA_OFFSETS.map((offset) => [
    position[X] + offset[X],
    position[Y] + offset[Y],
  ]);
};

export const equal = (a: Position, b: Position): boolean =>
  a[X] === b[X] && a[Y] === b[Y];

export const union = (a: Position[], b: Position[]): Position[] => {
  const setOfA = new Set(a);
  return [...a, ...b.filter((x) => !setOfA.has(x))];
};
