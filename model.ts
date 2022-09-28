//TODO questions: can we use 3rd party npm?
//TODO G: 2d grid map nearest neighbors search
//TODO G: find nearest point in 2d space
//TODO G: 2d occupancy grid
//https://robotics.stackexchange.com/questions/952/whats-an-efficient-way-to-visit-every-reachable-space-on-a-grid-with-unknown-ob
//https://stackoverflow.com/questions/11555774/explore-grid-with-obstacles/11556238#11556238
//https://stackoverflow.com/questions/40596061/traversing-every-cell-possible-in-2d-array
//

import {PositionSet} from "./position-set";

export type CellType = "WALL" | "ROAD" | "CITY";
export const visitableCells: CellType[] = ["ROAD", "CITY"];

export type X = number;
export type Y = number;

export const X = 0;
export const Y = 1;

export type Position = readonly [X, Y];

export type GraphNode = Readonly<{
  readonly position: Position;
  readonly edges: GraphNode[];
}>

export type Graph = GraphNode;

export type World = Readonly<{
  readonly grid: CellType[][];
  readonly hometown: Position;
}>;

export type PositionStack = Position[];

export type SearchState = Readonly<{
  citiesFound: Position[];
  currentPosition: Position;
  targetPosition: Position;
  graph: GraphNode;
  openListStack: PositionStack;
  openListSet: PositionSet;
  closedList: PositionSet;
}>;

const eq = (a: Position, b: Position): boolean => a[0] === b[0] && a[1] === b[1];

const initializeGrid = (width: number, height: number, salesmanHome?: Position ): World => {

  const grid: World = {
    //TODO add cities and obstacles
    grid: Array.from({ length: height }, () => Array.from({ length: width }, () => "ROAD")),
    hometown: salesmanHome || [0, 0],
  }

  return grid;
}

const initState = (map: World): SearchState => {
  const { hometown } = map;

  const graph: GraphNode = {
    position: hometown,
    edges: [],
  }

  const searchState: SearchState = {
    citiesFound: [],
    currentPosition: hometown,
    targetPosition: hometown,
    graph,
    openList: [],
    closedList: new PositionSet(),
  }

  return searchState;
}

const step = ({currentPosition, closedList, citiesFound, openList}: SearchState, map: World): SearchState => {

    //add current node to close list
    //TODO: make the set it immutable
    closedList.add(currentPosition);

    //remove current node from open list
    openList = openList.filter(position => !eq(position, currentPosition));

    //if city, add to citiesFound
    if (cellType(currentPosition, map.grid) === "CITY") {
      citiesFound = [...citiesFound, currentPosition];
    }

    //look around
    const {canMoveTo, canSee} = lookAround(currentPosition, map);

    //add new visitable positions to open list
    //TODO if not in open list olready
    openList = [...openList, ...canMoveTo.filter(position => notVisited(position, closedList))];

    //add new nodes edges to graph

    //move to next position in open list
      //prioritize, heuristics
        //stubs first (min gaps)
    return {
      citiesFound,

    }
}

const lookAround = (from: Position, {grid}: World) => {
  return { canMoveTo: canMoveTo(from, grid), canSee: canSee(from, grid) };
}

const canMoveTo = (from: Position, grid: CellType[][]): Position[] => {
  const moveToOffsets = [[1,0], [-1,0], [0,1], [0,-1]];
  return moveToOffsets
    .map<Position>(([x,y]) => [from[X] + x, from[Y] + y])
    .filter(position => visitable(cellType(position, grid)));
}

const canSee = (from: Position, grid: CellType[][]): Position[] => {
  const visibleOffsets = [[1,1], [1,-1], [-1,1], [-1,-1]];
  return visibleOffsets
  .map<Position>(([x,y]) => [from[X] + x, from[Y] + y])
  .filter(position => visitable(cellType(position, grid)));
}

const cellType = (position: Position, grid: CellType[][]): CellType | undefined => {
  return grid[position[X]]?.[position[Y]];
}

const visitable = (cellType: CellType | undefined): boolean => {
  return cellType !== undefined && cellType !== "WALL";
}

const notVisited = (position: Position, closedList: PositionSet): boolean => {
  return !closedList.has(position);
}

