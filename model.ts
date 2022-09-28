//TODO questions: can we use 3rd party npm?
//TODO G: 2d grid map nearest neighbors search
//TODO G: find nearest point in 2d space
//TODO G: 2d occupancy grid
//https://robotics.stackexchange.com/questions/952/whats-an-efficient-way-to-visit-every-reachable-space-on-a-grid-with-unknown-ob
//https://stackoverflow.com/questions/11555774/explore-grid-with-obstacles/11556238#11556238
//https://stackoverflow.com/questions/40596061/traversing-every-cell-possible-in-2d-array


import {Set, OrderedSet} from "immutable";
import {offset, position, Position} from "./position";


export type CellType = "WALL" | "ROAD" | "CITY";

export type GraphNode = Readonly<{
  readonly position: Position;
  readonly edges: GraphNode[];
}>

export type Graph = GraphNode;

export type World = Readonly<{
  readonly grid: CellType[][];
  readonly hometown: Position;
}>;
export type SearchState = Readonly<{
  citiesFound: Set<Position>;
  currentPosition: Position;
  targetPosition: Position | undefined;
  graph: GraphNode;
  openList: OrderedSet<Position>;
  closedList: Set<Position>;
  isDone: boolean;
}>;

export const initializeWorld = (width: number, height: number, salesmanHome?: Position ): World => {

  const world: World = {
    //TODO add cities and obstacles
    grid: Array.from({ length: height }, () => Array.from({ length: width }, () => "ROAD")),
    hometown: position(0,0),
  }

  return world;
}

export const initState = (map: World): SearchState => {
  const { hometown } = map;

  const graph: GraphNode = {
    position: hometown,
    edges: [],
  }

  const searchState: SearchState = {
    citiesFound: Set<Position>(),
    currentPosition: hometown,
    targetPosition: undefined,
    graph,
    openList: OrderedSet<Position>(),
    closedList: Set<Position>(),
    isDone: false,
  }

  return searchState;
}

const step = ({currentPosition, closedList, citiesFound, openList}: SearchState, map: World): SearchState => {

    //add current node to close list
    closedList = closedList.add(currentPosition);

    //remove current node from open list
    openList = openList.delete(currentPosition);

    //if city, add to citiesFound
    if (cellType(currentPosition, map.grid) === "CITY") {
      citiesFound = citiesFound.add(currentPosition);
    }

    //look around
    const whatCanWeSee = whatCanSee(currentPosition, map.grid);
    const whereCanWeGo = whereCanGo(currentPosition, map.grid);

    const newArea = Set.union<Position>([whatCanWeSee, whereCanWeGo])
      .subtract(openList)
      .subtract(closedList);

    //add new canMoveTo positions to open list
    openList = openList.union(newArea);

    //add new nodes edges to graph

    //move to next position in open list
      //prioritize, heuristics
        //stubs first (min gaps)
    // return {
    //   citiesFound,
    //
    // }
}


/**
 * All positions where we can go to from our position
 */
const whereCanGo = (from: Position, grid: CellType[][]): Set<Position> => {
  const possibleMoves = [offset(1,0), offset(-1,0), offset(0,1), offset(0,-1)];
  return Set.of<Position>(...possibleMoves
      .map(offset => position(from.x + offset.x, from.y + offset.y))
      .filter(move => canMoveTo(cellType(move, grid))));
}

/**
 * All visitable positions that we can see from our position.
 * Does not include positions we can go to (use {@link whereCanGo} for that).
 */
const whatCanSee = (from: Position, grid: CellType[][]): Set<Position> => {
  const visibleArea = [offset(1,1), offset(1,-1), offset(-1,1), offset(-1,-1)];
  return Set.of<Position>(...visibleArea
    .map(offset => position(from.x + offset.x, from.y + offset.y))
    .filter(move => canMoveTo(cellType(move, grid))));
}

/**
 * Cell type at position. Undefined if out of bounds.
 */
const cellType = (position: Position, grid: CellType[][]): CellType | undefined => {
  return grid[position.x]?.[position.y];
}

/**
 * Can we move to this cell type?
 */
const canMoveTo = (cellType: CellType | undefined): boolean => {
  return cellType !== undefined && cellType !== "WALL";
}

const extendGraph = (graph: Graph, newArea: Set<Position>): Graph => {
  return graph;
}


