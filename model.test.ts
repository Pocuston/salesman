import {initWorld, initState, SearchState, step} from "./model";

test('smoke test of model', () => {
  const world = initWorld(30, 20);

  let state = initState(world);

  logState(state);

  state = step(state, world);

  logState(state);

});

const logState = (state: SearchState) => {
  console.log(JSON.stringify(state, null, 2));
}