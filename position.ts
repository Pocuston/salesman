import {Record, is} from "immutable";

export type X = number;
export type Y = number;

export const X = 0;
export const Y = 1;

export type Position = { x: X, y: Y};
export type Offset = Position;

//using Position as a Record we can use it as value of Set of key of Map
//also it is immutable
const positionFactory = Record<Position>({x: 0, y: 0});

export const position = (x: X, y: Y): Position => positionFactory({x, y});
export const offset = (x: X, y: Y): Offset => positionFactory({x, y});
export const isEqual = (a: Position, b: Position): boolean => is(a, b);
