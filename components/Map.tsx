import { CellType, cityName, State, visited, World } from "../model";
import { Sprite, Stage, Text } from "@inlet/react-pixi";
import { Position, visibleFrom, X, Y } from "../position";
import { has } from "../position-set";

type MapProps = {
  state: State;
  world: World;
};

const fieldSize = 32;

const Map = ({ state, world }: MapProps) => {
  return (
    <div>
      <Stage
        width={world.grid[0].length * fieldSize}
        height={world.grid.length * fieldSize}
        options={{ backgroundColor: 0x1099bb }}
      >
        <World world={world} state={state} />
        <Salesman state={state} />
      </Stage>
    </div>
  );
};

export default Map;

const World = ({ world, state }: { world: World; state: State }) => {
  const cells: JSX.Element[] = [];
  world.grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      cells.push(
        <Cell cell={cell} state={state} position={[x, y]} key={`[${x},${y}]`} />
      );
    });
  });

  return <>{cells}</>;
};

const Salesman = ({ state }: { state: State }) => {
  return (
    <Sprite
      image="./resources/salesman.png"
      x={state.currentPosition[X] * fieldSize}
      y={state.currentPosition[Y] * fieldSize}
    />
  );
};

const Cell = ({
  cell,
  position,
  state,
}: {
  cell: CellType;
  position: Position;
  state: State;
}): JSX.Element => {
  const x = position[X] * fieldSize;
  const y = position[Y] * fieldSize;
  switch (cell) {
    case "ROAD":
      return visited(position, state) ? (
        <Sprite image={"./resources/visited.png"} x={x} y={y} />
      ) : (
        <></>
      );
    case "CITY":
      return visited(position, state) ? (
        <>
          <Sprite image={"./resources/city.png"} x={x} y={y} />
          <Text
            text={cityName(position, state.citiesFound)}
            x={x}
            y={y}
            anchor={-0.1}
          />
        </>
      ) : (
        <></>
      );
    case "WALL": {
      // TODO: rendering could be optimised to keep visible walls in state
      return isWallVisible(position, state) ? (
        <Sprite image={"./resources/wall.png"} x={x} y={y} />
      ) : (
        <></>
      );
    }
  }

  return <></>;
};

const isWallVisible = (position: Position, state: State) => {
  return visibleFrom(position).some((p) => has(state.closedListSet, p));
};
