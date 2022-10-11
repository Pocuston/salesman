import {equal, Position, walkableFrom, X, Y} from "./position";
import {PositionSet, toList} from "./position-set";
import {minBy} from "lodash";

// 2d array indexed by [x][y] with Nodes as values for fast graph operations in O(1)
export type Graph = Node[][];

type Node = {
  // node position in grid
  readonly position: Position;
  // parent node in path
  parent: Node | null;
  // distance from start node
  g: number;
  // estimated distance (heuristic) to end node
  h: number;
  // g + h
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
      g: Infinity,
      h: Infinity,
      f: Infinity,
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
  startNode.g = 0;
  startNode.h = 0;
  startNode.f = 0;

  const endNode = graph[to[X]][to[Y]];

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode = minBy(openList, (node) => node.f)!;
    if (equal(currentNode.position, endNode.position)) {
      return constructPath(currentNode);
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

      if (!openList.some((node) => equal(node.position, neighbour.position))) {
        openList.push(neighbour);
      }

      let g = currentNode.g + 1;
      if (g < neighbour.g) {
        neighbour.parent = currentNode;
        neighbour.g = g;
        neighbour.h = manhattanDistance(neighbour.position, endNode.position);
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
    .map((position) => graph[position[X]]?.[position[Y]])
    .filter((node) => node !== undefined);

const constructPath = (node: Node): Position[] => {
  let curr = node;
  const path = [];
  while (curr.parent !== null) {
    path.push(curr.position);
    curr = curr.parent;
  }
  return path.reverse();
};
