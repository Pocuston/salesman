import { CellType } from "./model";

//prettier-ignore
// const map: CellType[][] = [
//   ["CITY", "WALL", "ROAD", "CITY"],
//   ["ROAD", "CITY", "ROAD", "ROAD"],
//   ["ROAD", "WALL", "ROAD", "CITY"],
// ];

//prettier-ignore
const map: CellType[][] = [
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "CITY", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","CITY", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["WALL", "WALL", "WALL", "WALL","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "WALL", "ROAD","WALL", "WALL", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "CITY", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "CITY", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "CITY", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "CITY", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "WALL","WALL", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","CITY", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "WALL", "WALL","WALL", "WALL", "WALL", "WALL", "WALL", "WALL","WALL", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "CITY", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "CITY", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","CITY", "ROAD", "CITY", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "CITY"],
];

export default map;
