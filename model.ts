import { Position, squareAround, X, Y } from "./position";
import { add, PositionSet, remove, subtract, toList } from "./position-set";
import { minBy } from "lodash";
import { manhattanDistance } from "./aStar";

export type CellType = "WALL" | "ROAD" | "CITY";

export type World = Readonly<{
  readonly grid: CellType[][];
  readonly hometown: Position;
}>;

export const initWorld = (grid: CellType[][], hometown: Position): World => {
  return {
    grid,
    hometown,
  };
};

export type SearchState = Readonly<{
  stepCount: number;
  citiesFound: Position[];
  plannedRoute: Position[];
  openListSet: PositionSet; //to be able to check if position is in open list in O(1)
  closedListSet: PositionSet; //to be able to check if position is in closed list in O(1)
  graph: PositionSet; //graph of the explored accessible area
}>;

export const initState = (map: World): SearchState => {
  const { hometown } = map;

  return {
    stepCount: 0,
    citiesFound: [],
    plannedRoute: [hometown],
    openListSet: [],
    closedListSet: [],
    graph: [],
  };
};

export const step = (
  {
    plannedRoute,
    closedListSet,
    citiesFound,
    openListSet,
    graph,
    stepCount,
  }: SearchState,
  { grid }: World
): SearchState => {
  //dequeue one move from the planned route
  //it will be the new current position
  const [currentPosition, ...remainingRoute] = plannedRoute;

  //optimisation: if there are more planned moves in the route,
  //we don't bother with the "exploring" part
  if (remainingRoute.length > 0) {
    plannedRoute = remainingRoute;
  } else {
    //add current node to close list
    closedListSet = add(closedListSet, currentPosition);

    //remove current node from open list
    openListSet = remove(openListSet, currentPosition);

    //if city, add to citiesFound
    if (cellAt(currentPosition, grid) === "CITY") {
      citiesFound = [...citiesFound, currentPosition];
    }

    const newPaths = subtract(
      //TODO add new paths only if reachable from current graph?
      whereCanGoFrom(currentPosition, grid),
      closedListSet
    );

    //add new explored positions to open list
    //TODO add new paths only if reachable from current graph?
    openListSet = add(openListSet, ...newPaths);

    //update the graph of whole explored area
    //TODO add new paths only if reachable from current graph?
    graph = add(graph, ...newPaths);

    //TODO: prioritize, heuristics
    //TODO: stubs first (min gaps)
    const nextMove =
      chooseNextMove(currentPosition, openListSet) ?? currentPosition;
    //TODO: if next move not directly reachable, find path to it
    //TODO: next move maybe not reachable at all!
    plannedRoute = [nextMove];
  }

  return {
    stepCount: ++stepCount,
    closedListSet,
    openListSet,
    citiesFound,
    graph,
    plannedRoute,
  };
};

const whereCanGoFrom = (from: Position, grid: CellType[][]): Position[] => {
  //TODO add
  return squareAround(from).filter((move) => canMoveTo(cellAt(move, grid)));
};

/**
 * Cell type at position or undefined if out of bounds.
 */
const cellAt = (
  position: Position,
  grid: CellType[][]
): CellType | undefined => {
  const [x, y] = position;
  return grid[y]?.[x];
};

/**
 * Can we move to this cell type?
 */
const canMoveTo = (cellType: CellType | undefined): boolean => {
  return cellType !== undefined && cellType !== "WALL";
};

const chooseNextMove = (
  currentPosition: Position,
  openListSet: PositionSet
): Position | undefined => {
  const list = toList(openListSet);
  return minBy(list, (position) =>
    manhattanDistance(currentPosition, position)
  );
};
