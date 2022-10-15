import { equal, Position, walkableFrom, X, Y } from "./position";
import {
  has,
  PositionMap,
  PositionSet,
  remove,
  set,
  toList,
  values,
} from "./position-set";
import { minBy } from "lodash";

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

type Graph = PositionMap<Node>;

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
  let openList: PositionMap<Node> = [];
  let closedList: PositionMap<Node> = [];

  const graph = init(positionSet);
  const startNode = graph[from[X]][from[Y]];
  startNode.g = 0;
  startNode.h = 0;
  startNode.f = 0;

  const endNode = graph[to[X]][to[Y]];

  openList = set(openList, startNode.position, startNode);

  while (openList.length > 0) {
    // we choose the node in openList having the lowest f value
    let currentNode = minBy([...values(openList)], (node) => node.f)!;

    // if we reached the end node, we're done here and can construct the shortest path
    if (equal(currentNode.position, endNode.position)) {
      return constructPath(currentNode);
    }

    openList = remove(openList, currentNode.position);
    closedList = set(closedList, currentNode.position, currentNode);

    const neighbours = neighboursOf(currentNode, graph);
    for (const neighbour of neighbours) {
      if (has(closedList, neighbour.position)) {
        continue;
      }

      if (!has(openList, neighbour.position)) {
        openList = set(openList, neighbour.position, neighbour);
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
