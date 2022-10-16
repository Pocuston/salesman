import { CellType, cityName, State, visited, World } from "../model";
import { Sprite, Stage, Text } from "@inlet/react-pixi";
import { equal, Position, visibleFrom, X, Y } from "../position";
import { has } from "../position-set";
import colors from "../colors";

type MapProps = {
  state: State;
  world: World;
};

const fieldSize = 32;

const Map = ({ state, world }: MapProps) => {
  return (
    <div className="map">
      <Stage
        width={world.grid[0].length * fieldSize}
        height={world.grid.length * fieldSize}
        options={{ backgroundColor: colors.Fog }}
      >
        <World world={world} state={state} />
        <Salesman state={state} />
      </Stage>
      <style jsx>{`
        .map {
          border-radius: 4px;
          height: ${world.grid.length * fieldSize + 8}px;
          padding: 4px;
          background-color: #707070;
          box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        }
      `}</style>
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
}): JSX.Element | null => {
  const x = position[X] * fieldSize;
  const y = position[Y] * fieldSize;
  switch (cell) {
    case "ROAD":
      if (onRouteHome(position, state)) {
        return <Sprite image={"./resources/home-route.png"} x={x} y={y} />;
      } else if (visited(position, state)) {
        return <Sprite image={"./resources/visited.png"} x={x} y={y} />;
      } else {
        return null;
      }
    case "CITY":
      // TODO: optimise resolving city name
      return visited(position, state) ? (
        <>
          <Sprite image={"./resources/city.png"} x={x} y={y} />
          <Text
            text={cityName(position, state.citiesFound)}
            x={x + 7}
            y={y + 1}
            isSprite={true}
          />
        </>
      ) : null;
    case "WALL": {
      // TODO: rendering could be optimised to keep visible walls in state
      return isWallVisible(position, state) ? (
        <Sprite image={"./resources/wall.png"} x={x} y={y} />
      ) : null;
    }
  }

  return null;
};

const isWallVisible = (position: Position, state: State) => {
  return visibleFrom(position).some((p) => has(state.closedListSet, p));
};

const onRouteHome = (position: Position, state: State) => {
  return (
    state.phase === "GOING_HOME" &&
    state.plannedRoute.some((p) => equal(p, position))
  );
};
