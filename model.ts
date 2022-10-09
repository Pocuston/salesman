import { equal, Position, squareAround, walkableFrom, X, Y } from "./position";
import { add, PositionSet, remove, subtract, toList } from "./position-set";
import { minBy } from "lodash";
import { findRoute, manhattanDistance } from "./aStar";

export type CellType = "WALL" | "ROAD" | "CITY";

export type STATUS = "INIT" | "EXPLORING" | "HOME_ROUTE" | "DONE";

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
  currentPosition: Position;
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
    currentPosition: hometown,
    citiesFound: [],
    plannedRoute: [],
    openListSet: [],
    closedListSet: [],
    graph: [],
  };
};

export const step = (
  {
    currentPosition,
    plannedRoute,
    closedListSet,
    citiesFound,
    openListSet,
    graph,
    stepCount,
  }: SearchState,
  { grid }: World
): SearchState => {
  //optimisation: if there are more planned moves the route queue
  //we just move to another position and don't bother with the "exploring" part
  if (plannedRoute.length === 0) {
    //add current node to close list
    closedListSet = add(closedListSet, currentPosition);

    //add current node to graph
    graph = add(graph, currentPosition);

    //remove current node from open list
    openListSet = remove(openListSet, currentPosition);

    //if city, add to citiesFound
    if (
      cellAt(currentPosition, grid) === "CITY" &&
      !citiesFound.some((p) => equal(p, currentPosition))
    ) {
      citiesFound = [...citiesFound, currentPosition];
    }

    const newPaths = subtract(
      whereCanGoFrom(currentPosition, grid),
      closedListSet
    );

    //add new explored positions to open list
    openListSet = add(openListSet, ...newPaths);

    //update the graph of whole explored area
    graph = add(graph, ...newPaths);
  }

  //TODO: prioritize, heuristics
  //TODO: maxBy count of neighbours in closed set
  //TODO: stubs first (min gaps)
  plannedRoute = chooseNextRoute(
    currentPosition,
    openListSet,
    graph,
    hometown(citiesFound)
  );

  //dequeue from the planned route
  //it will be the new current position
  const [nextPosition, ...remainingRoute] = plannedRoute;
  currentPosition = nextPosition ?? currentPosition;
  plannedRoute = remainingRoute;

  const newState = {
    currentPosition,
    closedListSet,
    openListSet,
    citiesFound,
    graph,
    plannedRoute,
    stepCount: ++stepCount,
  };

  console.log(newState);

  return newState;
};

const whereCanGoFrom = (from: Position, grid: CellType[][]): Position[] => {
  //TODO...
  //return squareAround(from).filter((move) => canMoveTo(cellAt(move, grid)));
  return walkableFrom(from).filter((move) => canMoveTo(cellAt(move, grid)));
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

const chooseNextRoute = (
  currentPosition: Position,
  openListSet: PositionSet,
  graph: PositionSet,
  hometown: Position
): Position[] => {
  const list = toList(openListSet);
  let nextMove = minBy(list, (position) =>
    manhattanDistance(currentPosition, position)
  );

  //if there is no more exploration move, lets go home...
  if (nextMove === undefined) {
    return !equal(currentPosition, hometown)
      ? findRoute(currentPosition, hometown, graph)
      : [];
  }

  //if the next move is directly walkavle from our position, set a new route there
  if (walkableFrom(currentPosition).some((p) => equal(p, nextMove!))) {
    return [nextMove];
  }

  //if the next move is more distant, use A* to find a route there
  return findRoute(currentPosition, nextMove, graph);
};

export const isFinished = (state: SearchState): boolean =>
  state.stepCount > 0 && state.plannedRoute.length === 0;

const hometown = (citiesFound: Position[]): Position => citiesFound.at(0)!;
