import { initWorld, initState, SearchState, step, CellType } from "./model";
import { from, hasPosition, PositionSet, toList } from "./position-set";
import { Position } from "./position";

const smallGrid: CellType[][] = [
  ["CITY", "WALL", "ROAD", "CITY"],
  ["ROAD", "CITY", "ROAD", "ROAD"],
  ["ROAD", "WALL", "ROAD", "CITY"],
];

test("smoke test on 4 x 3 map", () => {
  const world = initWorld(smallGrid, [1, 1]);

  let initialState = initState(world);

  //step 1: [1, 1] -> [0, 1]
  const state1 = step(initialState, world);
  assertStep1(state1);

  //step 2: [0, 1] -> [0, 0]
  const state2 = step(state1, world);
  assertStep2(state2);

  //step 3: [0, 0] -> [0, 1]
  const state3 = step(state2, world);
  assertStep3(state3);

  //step 4: [0, 1] -> [0, 2]
  const state4 = step(state3, world);
  assertStep4(state4);

  //step 5: [0, 2] -> [x, y] -> [2, 1]
  const state5 = step(state4, world);
  assertStep5(state5);
});

function assertStep1(state: SearchState) {
  expect(state.citiesFound).toEqual([[1, 1]]);
  expect(state.closedListSet).toEqual(from([1, 1]));
  expect(toList(state.openListSet)).toEqual([
    [0, 1],
    [2, 1],
  ]);
  expect(toList(state.graph)).toEqual([
    [0, 1],
    [1, 1],
    [2, 1],
  ]);
  expect(state.plannedRoute).toEqual([[0, 1]]);
  expect(state.stepCount).toEqual(1);
}

function assertStep2(state: SearchState) {
  expect(state.citiesFound).toEqual([[1, 1]]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1]));
  expect(state.openListSet).toEqual(from([0, 0], [0, 2], [2, 1]));
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([[0, 0]]);
  expect(state.stepCount).toEqual(2);
}

function assertStep3(state: SearchState) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0]));
  expect(state.openListSet).toEqual(from([0, 2], [2, 1]));
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([
    [0, 1],
    [0, 2],
  ]);
  expect(state.stepCount).toEqual(3);
}

function assertStep4(state: SearchState) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0]));
  expect(state.openListSet).toEqual(from([0, 2], [2, 1]));
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([[0, 2]]);
  expect(state.stepCount).toEqual(4);
}

function assertStep5(state: SearchState) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0], [0, 2]));
  expect(toList(state.openListSet)).toEqual([[2, 1]]);
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([
    [0, 1],
    [1, 1],
    [2, 1],
  ]);
  expect(state.stepCount).toEqual(5);
}
