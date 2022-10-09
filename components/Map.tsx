import { SearchState, World, CellType } from "../model";
import pixi from "pixi.js";
import { Stage, Sprite } from "@inlet/react-pixi";
import { has } from "../position-set";
import { X, Y } from "../position";

type MapProps = {
  state: SearchState;
  world: World;
};

const fieldSize = 32;

type RenderableCellTypes = Exclude<CellType, "ROAD">;
const textures: { [key in RenderableCellTypes]: string } = {
  WALL: "./resources/wall.png",
  CITY: "./resources/city.png",
};

const renderable = (cell: CellType): cell is RenderableCellTypes => {
  return cell !== "ROAD";
};

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

const World = ({ world, state }: { world: World; state: SearchState }) => {
  const walls: JSX.Element[] = [];
  world.grid.forEach((row, y) => {
    row.forEach((field, x) => {
      // TODO: render city number
      if (renderable(field)) {
        walls.push(
          <Sprite image={textures[field]} x={x * fieldSize} y={y * fieldSize} />
        );
      } else if (state.closedListSet && has(state.closedListSet, [x, y])) {
        walls.push(
          <Sprite
            image={"./resources/visited.png"}
            x={x * fieldSize}
            y={y * fieldSize}
          />
        );
      }
    });
  });

  return <>{walls}</>;
};

const Salesman = ({ state }: { state: SearchState }) => {
  return (
    <Sprite
      image="./resources/salesman.png"
      x={state.currentPosition[X] * fieldSize}
      y={state.currentPosition[Y] * fieldSize}
    />
  );
};
