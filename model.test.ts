import { CellType, initState, initWorld, State, step } from "./model";
import { from, toList } from "./position-set";

const smallGrid: CellType[][] = [
  ["CITY", "WALL", "ROAD", "CITY"],
  ["ROAD", "CITY", "ROAD", "ROAD"],
  ["ROAD", "WALL", "ROAD", "CITY"],
];

// TODO cleanup tests
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

  //step 5: [0, 2] -> [0, 1]
  const state5 = step(state4, world);
  assertStep5(state5);

  //step 6: [0, 1] -> [1, 1]
  const state6 = step(state5, world);
  assertStep6(state6);

  //step 7: [1, 1] -> [2, 1]
  const state7 = step(state6, world);
  assertStep7(state7);

  //step 8: [2, 1] -> [2, 0]
  const state8 = step(state7, world);
  assertStep8(state8);

  //step 9: [2, 0] -> [3, 0]
  const state9 = step(state8, world);
  assertStep9(state9);

  //step 10: [3, 0] -> [3, 1]
  const state10 = step(state9, world);
  assertStep10(state10);

  //step 11: [3, 1] -> [3, 2]
  const state11 = step(state10, world);
  assertStep11(state11);

  //step 12: [3, 2] -> [2, 2]
  const state12 = step(state11, world);
  assertStep12(state12);

  //step 13: [2, 2]
  const state13 = step(state12, world);
  assertStep13(state13);

  const state14 = step(state13, world);
  assertStep14(state14);
});

function assertStep1(state: State) {
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
  expect(state.plannedRoute).toEqual([]);
  expect(state.currentPosition).toEqual([0, 1]);
  expect(state.stepCount).toEqual(1);
}

function assertStep2(state: State) {
  expect(state.citiesFound).toEqual([[1, 1]]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1]));
  expect(state.openListSet).toEqual(from([0, 0], [0, 2], [2, 1]));
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([]);
  expect(state.currentPosition).toEqual([0, 0]);
  expect(state.stepCount).toEqual(2);
}

function assertStep3(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0]));
  expect(state.openListSet).toEqual(from([0, 2], [2, 1]));
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([[0, 2]]);
  expect(state.currentPosition).toEqual([0, 1]);
  expect(state.stepCount).toEqual(3);
}

function assertStep4(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0]));
  expect(state.openListSet).toEqual(from([0, 2], [2, 1]));
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([]);
  expect(state.currentPosition).toEqual([0, 2]);
  expect(state.stepCount).toEqual(4);
}

function assertStep5(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0], [0, 2]));
  expect(toList(state.openListSet)).toEqual([[2, 1]]);
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([
    [1, 1],
    [2, 1],
  ]);
  expect(state.currentPosition).toEqual([0, 1]);
  expect(state.stepCount).toEqual(5);
}

function assertStep6(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0], [0, 2]));
  expect(toList(state.openListSet)).toEqual([[2, 1]]);
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.plannedRoute).toEqual([[2, 1]]);
  expect(state.currentPosition).toEqual([1, 1]);
  expect(state.stepCount).toEqual(6);
}

function assertStep7(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(from([1, 1], [0, 1], [0, 0], [0, 2]));
  expect(toList(state.openListSet)).toEqual([[2, 1]]);
  expect(state.graph).toEqual(from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2]));
  expect(state.currentPosition).toEqual([2, 1]);
  expect(state.plannedRoute).toEqual([]);
  expect(state.stepCount).toEqual(7);
}

function assertStep8(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(
    from([1, 1], [0, 1], [0, 0], [0, 2], [2, 1])
  );
  expect(toList(state.openListSet)).toEqual([
    [2, 0],
    [2, 2],
    [3, 1],
  ]);
  expect(state.graph).toEqual(
    from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2], [2, 0], [2, 2], [3, 1])
  );
  expect(state.plannedRoute).toEqual([]);
  expect(state.currentPosition).toEqual([2, 0]);
  expect(state.stepCount).toEqual(8);
}

function assertStep9(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
  ]);
  expect(state.closedListSet).toEqual(
    from([1, 1], [0, 1], [0, 0], [0, 2], [2, 1], [2, 0])
  );
  expect(toList(state.openListSet)).toEqual([
    [2, 2],
    [3, 0],
    [3, 1],
  ]);
  expect(state.graph).toEqual(
    from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2], [2, 0], [2, 2], [3, 1], [3, 0])
  );
  expect(state.currentPosition).toEqual([3, 0]);
  expect(state.plannedRoute).toEqual([]);
  expect(state.stepCount).toEqual(9);
}

function assertStep10(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
    [3, 0],
  ]);
  expect(state.closedListSet).toEqual(
    from([1, 1], [0, 1], [0, 0], [0, 2], [2, 1], [2, 0], [3, 0])
  );
  expect(toList(state.openListSet)).toEqual([
    [2, 2],
    [3, 1],
  ]);
  expect(state.graph).toEqual(
    from([0, 1], [1, 1], [2, 1], [0, 0], [0, 2], [2, 0], [2, 2], [3, 1], [3, 0])
  );
  expect(state.currentPosition).toEqual([3, 1]);
  expect(state.plannedRoute).toEqual([]);
  expect(state.stepCount).toEqual(10);
}

function assertStep11(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
    [3, 0],
  ]);
  expect(state.closedListSet).toEqual(
    from([1, 1], [0, 1], [0, 0], [0, 2], [2, 1], [2, 0], [3, 0], [3, 1])
  );
  expect(toList(state.openListSet)).toEqual([
    [2, 2],
    [3, 2],
  ]);
  expect(state.graph).toEqual(
    from(
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
      [3, 1],
      [3, 0],
      [3, 2]
    )
  );
  expect(state.currentPosition).toEqual([3, 2]);
  expect(state.plannedRoute).toEqual([]);
  expect(state.stepCount).toEqual(11);
}

function assertStep12(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
    [3, 0],
    [3, 2],
  ]);
  expect(state.closedListSet).toEqual(
    from([1, 1], [0, 1], [0, 0], [0, 2], [2, 1], [2, 0], [3, 0], [3, 1], [3, 2])
  );
  expect(toList(state.openListSet)).toEqual([[2, 2]]);
  expect(state.graph).toEqual(
    from(
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
      [3, 1],
      [3, 0],
      [3, 2]
    )
  );
  expect(state.currentPosition).toEqual([2, 2]);
  expect(state.plannedRoute).toEqual([]);
  expect(state.stepCount).toEqual(12);
}

function assertStep13(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
    [3, 0],
    [3, 2],
  ]);
  expect(state.closedListSet).toEqual(
    from(
      [1, 1],
      [0, 1],
      [0, 0],
      [0, 2],
      [2, 1],
      [2, 0],
      [3, 0],
      [3, 1],
      [3, 2],
      [2, 2]
    )
  );
  expect(toList(state.openListSet)).toEqual([]);
  expect(state.graph).toEqual(
    from(
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
      [3, 1],
      [3, 0],
      [3, 2]
    )
  );
  expect(state.currentPosition).toEqual([2, 1]);
  expect(state.plannedRoute).toEqual([[1, 1]]);
  expect(state.stepCount).toEqual(13);
}

function assertStep14(state: State) {
  expect(state.citiesFound).toEqual([
    [1, 1],
    [0, 0],
    [3, 0],
    [3, 2],
  ]);

  expect(state.currentPosition).toEqual([1, 1]);
  expect(state.plannedRoute).toEqual([]);
  expect(state.stepCount).toEqual(14);
}
