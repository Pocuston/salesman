export type X = number;
export type Y = number;

export const X = 0;
export const Y = 1;

export type Position = readonly [X, Y];
export type Offset = Position;

export const offset = (x: X, y: Y): Offset => [x, y];

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

export const equal = (a: Position, b: Position): boolean =>
  a[X] === b[X] && a[Y] === b[Y];
