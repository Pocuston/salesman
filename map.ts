import {CellType} from "./model";
import {Position} from "./position";

//prettier-ignore
// export const map: CellType[][] = [
//   ["CITY", "WALL", "ROAD", "CITY"],
//   ["ROAD", "CITY", "ROAD", "ROAD"],
//   ["ROAD", "WALL", "ROAD", "CITY"],
// ];
// export const hometown: Position = [10, 10];

//prettier-ignore
export const map: CellType[][] = [
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "CITY", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","CITY", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["WALL", "WALL", "WALL", "WALL","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "WALL", "ROAD","WALL", "WALL", "WALL", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "CITY", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "CITY", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "CITY", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "WALL","WALL", "WALL", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","CITY", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "WALL", "WALL","WALL", "WALL", "WALL", "WALL", "WALL", "WALL","WALL", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "CITY", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "CITY", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "CITY", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD"],
  ["ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "ROAD","ROAD", "WALL", "ROAD", "ROAD","ROAD", "ROAD", "ROAD", "ROAD", "ROAD", "CITY"],
];

export const hometown: Position = [10, 10];

export const randomHometown = (): Position => {
  const cities: Position[] = [];

  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "CITY") {
        cities.push([j, i]);
      }
    }
  }

  return cities[Math.floor(Math.random() * cities.length)];
};
