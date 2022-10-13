import { Position } from "./position";
import { findRoute } from "./aStar";
import { PositionSet } from "./position-set";

type Path = Position[];

/**
 * 2d array indexed by [city from][city to] with the fastest paths from city to city
 */
type FastestPaths = Path[][];

/**
 * Returns the shortest path that visits all cities from hometown and back to hometown
 */
export type ShortestPath = number[];

/**
 * Bruteforce solution to the salesman problem
 */
export const salesman = (cities: Position[], graph: PositionSet): number[] => {
  const fastestPaths = fastestPathsMatrix(cities, graph);
  const paths = citiesPermutations(cities.map((_, i) => i));

  let shortestPath: number[] = [];
  let shortestPathLength = Infinity;
  paths.forEach((path) => {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
      length = length + fastestPaths[path[i - 1]][path[i]].length;
    }
    if (length < shortestPathLength) {
      shortestPath = path;
      shortestPathLength = length;
    }
  });

  return shortestPath;
};

const fastestPathsMatrix = (
  cities: Position[],
  graph: PositionSet
): FastestPaths => {
  const fastestPaths: FastestPaths = [];

  cities.forEach((cityFrom, i) => {
    cities.forEach((cityTo, j) => {
      const path = findRoute(cityFrom, cityTo, graph);
      if (!fastestPaths[i]) fastestPaths[i] = [];
      if (!fastestPaths[j]) fastestPaths[j] = [];
      fastestPaths[i][j] = path;
      fastestPaths[j][i] = path;
    });
  });

  return fastestPaths;
};

const citiesPermutations = (cities: number[]): number[][] => {
  const [hometown, ...otherCities] = cities;

  const otherCitiesPermutations = permute(otherCities);

  return otherCitiesPermutations.map((permutation) => [
    hometown,
    ...permutation,
    hometown,
  ]);
};

const permute = (set: number[]): number[][] => {
  if (set.length === 1) return [[set[0]]];
  if (set.length === 2)
    return [
      [set[0], set[1]],
      [set[1], set[0]],
    ];

  const [first, ...rest] = set;

  const restPermutations = permute(rest);

  const permutations: number[][] = [];

  restPermutations.forEach((permutation) => {
    for (let i = 0; i <= permutation.length; i++) {
      const withFirst = [
        ...permutation.slice(0, i),
        first,
        ...permutation.slice(i),
      ];
      permutations.push(withFirst);
    }
  });

  return permutations;
};
