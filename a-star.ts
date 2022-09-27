import { equal, Position, walkableFrom, X, Y } from "./position";
import { has, PositionSet, toList } from "./position-set";
import { minBy } from "lodash";
// https://www.educative.io/answers/what-is-the-a-star-algorithm
// https://brilliant.org/wiki/a-star-search/

//2d array with node coordinates as indexes allows fast operations in O(1)
export type Graph = Node[][];

type Node = {
  readonly position: Position;
  parent: Node | null;
  g: number;
  h: number;
  f: number;
};

const init = (positionSet: PositionSet): Graph => {
  const positions = toList(positionSet);
  const graph: Graph = [];

  for (const position of positions) {
    const [x, y] = position;
    if (!graph[x]) graph[x] = [];
    graph[x][y] = {
      position,
      parent: null,
      g: 0,
      h: 0,
      f: 0,
    };
  }

  return graph;
};

export const findRoute = (
  from: Position,
  to: Position,
  positionSet: PositionSet
): Position[] => {
  let openList: Node[] = []; //TODO use PositionSet
  let closedList: Node[] = []; //TODO use PositionSet

  const graph = init(positionSet);
  const startNode = graph[from[X]][from[Y]];
  const endNode = graph[to[X]][to[Y]];

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode = minBy(openList, (node) => node.f)!;
    if (equal(currentNode.position, endNode.position)) {
      //TODO move to function collectPath
      let curr = currentNode!;
      const path = [];
      while (curr.parent !== null) {
        path.push(curr.position);
        curr = curr.parent;
      }
      return path.reverse();
    }

    openList = openList.filter(
      (node) => !equal(node.position, currentNode.position)
    );
    closedList.push(currentNode);

    const neighbours = neighboursOf(currentNode, graph);
    for (const neighbour of neighbours) {
      //TODO use set for closedList
      if (closedList.some((node) => equal(node.position, neighbour.position))) {
        continue;
      }

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (!openList.some((node) => equal(node.position, neighbour.position))) {
        gScoreIsBest = true;
        neighbour.h = manhattanDistance(neighbour.position, endNode.position);
        openList.push(neighbour);
      } else if (gScore < neighbour.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbour.parent = currentNode;
        neighbour.g = gScore;
        neighbour.f = neighbour.g + neighbour.h;
      }
    }
  }

  return [];
};

export const manhattanDistance = (a: Position, b: Position): number => {
  return Math.abs(a[X] - b[X]) + Math.abs(a[Y] - b[Y]);
};

const neighboursOf = (node: Node, graph: Graph): Node[] =>
  walkableFrom(node.position)
    .map((position) => graph[position[X]][position[Y]])
    .filter((node) => node !== undefined);
