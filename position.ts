import {Record, is} from "immutable";

export type X = number;
export type Y = number;

export const X = 0;
export const Y = 1;

export type Position = { x: X, y: Y};
export type Offset = Position;

//using Position as a Record we can use it as value of Set of key of Map
const positionFactory = Record<Position>({x: 0, y: 0});

export const position = (x: X, y: Y): Position => positionFactory({x, y});
export const offset = (x: X, y: Y): Offset => positionFactory({x, y});
export const isEqual = (a: Position, b: Position): boolean => is(a, b);

const POSSIBLE_MOVES_OFFSETS = [
    offset(1,0),
    offset(-1,0),
    offset(0,1),
    offset(0,-1)
];

export const possibleMoves = (from: Position): Position[] => {
    return POSSIBLE_MOVES_OFFSETS
        .map(offset => position(from.x + offset.x, from.y + offset.y));
}

const VISIBLE_AREA_OFFSETS = [offset(1,1), offset(1,-1), offset(-1,1), offset(-1,-1)];

export const visibleArea = (from: Position): Position[] => {
    return VISIBLE_AREA_OFFSETS
        .map(offset => position(from.x + offset.x, from.y + offset.y));
}