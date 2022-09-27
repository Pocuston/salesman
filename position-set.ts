import {Position, X, Y} from "./model";

export class PositionSet {
    private readonly positions: Map<X, Set<Y>> = new Map<X, Set<Y>>();

    constructor(positions: Position[] = []) {
      positions.forEach(position => this.add(position));
    }

    public add(position: Position): void {
      if (!this.positions.has(X)) {
        this.positions.set(X, new Set<Y>());
      }
      this.positions.get(X)!.add(Y);
    }

    public has(position: Position): boolean {
      return !!this.positions.get(X)?.has(Y);
    }
}

// export type PositionSet = Map<X, Set<Y>>;
//
// export const init = (): PositionSet => new Map();
//
// export const has = (positions: PositionSet, [X,Y]: Position) : boolean => {
//   return !!positions.get(X)?.has(Y);
// }
//
// export const add = (positions: PositionSet, [X,Y]: Position) : void => {
//   if (!positions.has(X)) {
//     positions.set(X, new Set<Y>());
//   }
//   positions.get(X)!.add(Y);
// }