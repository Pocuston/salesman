import { equal, Position, walkableFrom } from "./position";
import { add, PositionSet, remove, subtract, toList } from "./position-set";
import { last, minBy } from "lodash";
import { findRoute, manhattanDistance } from "./aStar";

export type CellType = "WALL" | "ROAD" | "CITY";

export type Phase = "EXPLORING" | "GOING_HOME" | "FINISHED";

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

export type State = Readonly<{
  phase: Phase;
  stepCount: number;
  currentPosition: Position;
  citiesFound: Position[];
  plannedRoute: Position[];
  openListSet: PositionSet; //to be able to check if position is in open list in O(1)
  closedListSet: PositionSet; //to be able to check if position is in closed list in O(1)
  graph: PositionSet; //graph of the explored accessible area
}>;

export const initState = (map: World): State => {
  const { hometown } = map;

  return {
    phase: "EXPLORING",
    stepCount: 0,
    currentPosition: hometown,
    citiesFound: [],
    plannedRoute: [],
    openListSet: [],
    closedListSet: [],
    graph: [],
  };
};

export const step = (state: State, map: World): State => {
  if (state.phase === "EXPLORING") {
    return explore(state, map);
  } else if (state.phase === "GOING_HOME") {
    return goHome(state);
  } else {
    return state;
  }
};

export const explore = (
  {
    phase,
    currentPosition,
    plannedRoute,
    closedListSet,
    citiesFound,
    openListSet,
    graph,
    stepCount,
  }: State,
  { grid }: World
): State => {
  //optimisation: if there are more planned moves the route queue
  //we just move to another position and don't bother with the "exploring" part
  if (plannedRoute.length === 0) {
    //add current node to close list
    closedListSet = add(closedListSet, currentPosition);

    //add current node to graph
    graph = add(graph, currentPosition);

    //remove current node from open list
    openListSet = remove(openListSet, currentPosition);

    //if we are at city, add to citiesFound
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

  const nextRoute = chooseNextRoute(
    currentPosition,
    openListSet,
    graph,
    plannedRoute
  );
  if (nextRoute !== null) {
    [currentPosition, ...plannedRoute] = nextRoute;
  } else {
    //if there is no more move left, find a route home and switch phase to "GOING_HOME"
    [currentPosition, ...plannedRoute] = findRoute(
      currentPosition,
      hometown(citiesFound),
      graph
    );
    phase = "GOING_HOME";
  }

  return {
    phase,
    currentPosition,
    closedListSet,
    openListSet,
    citiesFound,
    graph,
    plannedRoute,
    stepCount: ++stepCount,
  };
};

const goHome = (state: State): State => {
  const { plannedRoute, stepCount } = state;
  if (plannedRoute.length === 0) {
    return {
      ...state,
    };
  } else {
    const [nextPosition, ...remainingRoute] = plannedRoute;
    const phase = equal(nextPosition, hometown(state.citiesFound))
      ? "FINISHED"
      : state.phase;
    return {
      ...state,
      phase,
      currentPosition: nextPosition,
      plannedRoute: remainingRoute,
      stepCount: stepCount + 1,
    };
  }
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
  currentRoute: Position[]
): Position[] | null => {
  const list = toList(openListSet);
  let nextMove = minBy(list, (position) =>
    manhattanDistance(currentPosition, position)
  );

  //if there is no more move left, we stay at the current position
  if (nextMove === undefined) {
    return null;
  }

  //optimisation: if next move is the same as the current target of the planned route
  //we can spare finding a new route
  if (nextMove === last(currentRoute)) {
    return currentRoute;
  }

  //if the next move is directly walkable from our position, set a new route there
  if (walkableFrom(currentPosition).some((p) => equal(p, nextMove!))) {
    return [nextMove];
  }

  //if the next move is more distant, use A* to find a route there
  return findRoute(currentPosition, nextMove, graph);
};

const hometown = (citiesFound: Position[]): Position => citiesFound.at(0)!;

//TODO: implement optimisation
// const neighbourInClosedList = (currentPosition: Position, closedList: PositionSet): number => {
//
// });
