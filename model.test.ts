import { CellType, initState, initWorld, step } from "./model";
import { range } from "lodash";
import { map } from "./map";

const smallGrid: CellType[][] = [
  ["CITY", "WALL", "ROAD", "CITY"],
  ["ROAD", "CITY", "ROAD", "ROAD"],
  ["ROAD", "WALL", "ROAD", "CITY"],
];

describe("Integration tests of the problem solving algorithm on small map", () => {
  const steps = range(1, 14 + 1);
  const world = initWorld(smallGrid, [1, 1]);
  let state = initState(world);

  test("State is initialized correctly", () => {
    expect(state).toMatchSnapshot();
  });

  it.each(steps)("Step %i is resolved correctly", (_) => {
    state = step(state, world);
    expect(state).toMatchSnapshot();
  });
});

describe("Integration tests of the problem solving algorithm on 30x20 map", () => {
  const steps = range(1, 756 + 1);
  const world = initWorld(map, [15, 16]);
  let state = initState(world);

  test("State is initialized correctly", () => {
    expect(state.citiesFound).toMatchSnapshot();
  });

  it.each(steps)("Step %i is resolved correctly", (_) => {
    state = step(state, world);
    expect(state).toMatchSnapshot();
  });
});
