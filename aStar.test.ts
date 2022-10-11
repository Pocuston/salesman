import {from} from "./position-set";
import {findRoute} from "./aStar";

// prettier-ignore
const positions = from(
  [0, 0], [1, 0], [2, 0],
    [0, 1], [1, 1], //WALL
    [0, 2], [1, 2], [2, 2]
);

test("A* smoke test #1", () => {
  const route = findRoute([2, 2], [2, 0], positions);

  expect(route).toEqual([
    [1, 2],
    [1, 1],
    [1, 0],
    [2, 0],
  ]);
});

test("A* smoke test #2", () => {
  const route = findRoute([2, 0], [2, 2], positions);

  expect(route).toEqual([
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 2],
  ]);
});

test("A* smoke test #3", () => {
  const route = findRoute([0, 0], [3, 0], from([0, 0], [1, 0], [2, 0], [3, 0]));

  expect(route).toEqual([
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
});
