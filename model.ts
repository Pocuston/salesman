//TODO questions: can we use 3rd party npm?
//TODO G: 2d grid map nearest neighbors search
//TODO G: find nearest point in 2d space
//TODO G: 2d occupancy grid
//https://robotics.stackexchange.com/questions/952/whats-an-efficient-way-to-visit-every-reachable-space-on-a-grid-with-unknown-ob
//https://stackoverflow.com/questions/11555774/explore-grid-with-obstacles/11556238#11556238
//https://stackoverflow.com/questions/40596061/traversing-every-cell-possible-in-2d-array
import {Set, OrderedSet, Map} from "immutable";
import {offset, position, Position, possibleMoves, visibleArea} from "./position";
import {extendGraph, Graph} from "./graph";

export type CellType = "WALL" | "ROAD" | "CITY";

export type World = Readonly<{
  readonly grid: CellType[][];
  readonly hometown: Position;
}>;
export type SearchState = Readonly<{
  citiesFound: Set<Position>;
  currentPosition: Position;
  //targetPosition: Position | undefined;
  graph: Graph;
  openList: OrderedSet<Position>;
  closedList: Set<Position>;
}>;

export const initWorld = (width: number, height: number, salesmanHome?: Position ): World => {

  const world: World = {
    //TODO add cities and obstacles
    grid: Array.from({ length: height }, () => Array.from({ length: width }, () => "ROAD")),
    hometown: position(0,0),
  }

  return world;
}

export const initState = (map: World): SearchState => {
  const { hometown } = map;

  const graph: Graph = Map<Position, Set<Position>>()
    .set(hometown, Set<Position>());

  const searchState: SearchState = {
    citiesFound: Set<Position>(),
    currentPosition: hometown,
    //targetPosition: undefined,
    graph,
    openList: OrderedSet<Position>(),
    closedList: Set<Position>(),
  }

  return searchState;
}

export const step = ({currentPosition, closedList, citiesFound, openList, graph}: SearchState, map: World): SearchState => {

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

    //process new positions which are not in closed list or open list yet
    const newArea = Set.union<Position>([whatCanWeSee, whereCanWeGo])
      .subtract(openList)
      .subtract(closedList);

    //add new positions where can we move to open list
    openList = openList.union(whereCanWeGo);

    //add new nodes edges to graph
    graph = extendGraph(graph, newArea);

    //move to next position in open list
      //prioritize, heuristics
        //stubs first (min gaps)
    return {
      openList,
      closedList,
      citiesFound,
      graph,
      currentPosition
    }
}


/**
 * All positions where we can go to from our position
 */
const whereCanGo = (from: Position, grid: CellType[][]): Set<Position> => {
  return Set(possibleMoves(from)
      .filter(move => canMoveTo(cellType(move, grid))));
}

/**
 * All visitable positions that we can see from our position.
 * Does not include positions we can go to (use {@link whereCanGo} for that).
 */
const whatCanSee = (from: Position, grid: CellType[][]): Set<Position> => {
  return Set(visibleArea(from)
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




