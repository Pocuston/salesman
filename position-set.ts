import {cloneDeep} from "lodash";
import {Position} from "./position";

//PositionSet is a 2d array indexed by x,y coordinates
//is used for fast has & set operations in O(1)
export type PositionSet = typeof hasPosition[][];

//symbol used to flag a position exists in the set
const hasPosition: unique symbol = Symbol("hasPosition");

export const has = (set: PositionSet, position: Position): boolean => {
  const [x, y] = position;
  return set[x]?.[y] === hasPosition;
};

export function add(set: PositionSet, ...positions: Position[]): PositionSet {
  const newSet = cloneDeep(set);
  positions.forEach(([x, y]) => {
    if (!newSet[x]) newSet[x] = [];
    newSet[x][y] = hasPosition;
  });

  return newSet;
}

export const remove = (set: PositionSet, position: Position): PositionSet => {
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
        if (row[y] === hasPosition) {
          yield [x, y];
        }
      }
    }
  }
}

export const toList = (set: PositionSet): Position[] => {
  return [...iterator(set)];
};
