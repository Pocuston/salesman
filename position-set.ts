import {cloneDeep} from "lodash";
import {Position} from "./position";

/** PositionMap uses position tuple as key for fast {@link has} operations in O(1) **/
export type PositionMap<Value> = Value[][];

/** PositionSet uses position tuple as key for fast {@link has} operations in O(1) **/
export type PositionSet = PositionMap<typeof hasPosition>;

//symbol is used to flag that a position exists in the set
const hasPosition: unique symbol = Symbol("hasPosition");

export const has = (
  set: PositionSet | PositionMap<any>,
  position: Position
): boolean => {
  const [x, y] = position;
  return set[x]?.[y] !== undefined;
};

export function add(set: PositionSet, ...positions: Position[]): PositionSet {
  const newSet = cloneDeep(set);
  positions.forEach(([x, y]) => {
    if (!newSet[x]) newSet[x] = [];
    newSet[x][y] = hasPosition;
  });

  return newSet;
}

export function set<Value>(
  map: PositionMap<Value>,
  position: Position,
  value: Value
): PositionMap<Value> {
  const newSet = cloneDeep<PositionMap<Value>>(map);
  const [x, y] = position;
  if (!newSet[x]) newSet[x] = [];
  newSet[x][y] = value;

  return newSet;
}

export const remove = <Value>(
  set: PositionMap<Value>,
  position: Position
): PositionMap<Value> => {
  const [x, y] = position;
  const newSet = cloneDeep(set);
  if (newSet[x]) delete newSet[x][y];
  return newSet;
};

export const subtract = (list: Position[], set: PositionSet): Position[] => {
  return list.filter((position) => !has(set, position));
};

export const from = (...positions: Position[]) => {
  const set: PositionSet = [];
  return add(set, ...positions);
};

function* iterator(set: PositionSet): Generator<Position> {
  for (let x = 0; x < set.length; x++) {
    const row = set[x];
    if (row) {
      for (let y = 0; y < row.length; y++) {
        if (row[y] !== undefined) {
          yield [x, y];
        }
      }
    }
  }
}

export const toList = (set: PositionSet): Position[] => {
  return [...iterator(set)];
};

export function* values<Value>(map: PositionMap<Value>): Generator<Value> {
  for (let x = 0; x < map.length; x++) {
    const row = map[x];
    if (row) {
      for (let y = 0; y < row.length; y++) {
        if (row[y] !== undefined) {
          yield map[x][y];
        }
      }
    }
  }
}
