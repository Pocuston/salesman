import { hasPosition, PositionSet, toList } from "./position-set";
import { Position } from "./position";

// export type Graph = Node[][];
//
// type Node = Readonly<{
//   position: Position;
//   parent: Node | null;
//   g: number;
//   h: number;
//   f: number;
// }>;
//
// export const init = (positionSet: PositionSet): Graph => {
//   const positions = toList(positionSet);
//   const graph: Graph = [];
//
//   for (const position of positions) {
//     const [x, y] = position;
//     if (!graph[x]) graph[x] = [];
//     graph[x][y] = {
//       position,
//       parent: null,
//       g: 0,
//       h: 0,
//       f: 0,
//     };
//   }
//
//   return graph;
// };
