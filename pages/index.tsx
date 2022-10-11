import type { NextPage } from "next";
import map from "../map";
import { initState, initWorld, step } from "../model";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { salesman, ShortestPath } from "../salesman";

const world = initWorld(map, [1, 1]);

const Home: NextPage = () => {
  const [searchState, setSearchState] = useState(() => initState(world));
  const [shortestPath, setShortestPath] = useState<ShortestPath | null>(null);
  useEffect(() => {
    if (searchState.phase !== "FINISHED") {
      setShortestPath(null);
    } else {
      const path = salesman(searchState.citiesFound, searchState.graph);
      console.log({ path });
      setShortestPath(path);
    }
  }, [searchState.phase]);

  const handleStepClick = () => {
    if (searchState.phase !== "FINISHED") {
      setSearchState((currentState) => step(currentState, world));
    }
  };

  const handleResetClick = () => {
    setSearchState(initState(world));
  };

  return (
    <div className="container">
      <div className="Controls">
        {/* TODO play / pause + step forward */}
        <button className="button">Play</button>

        <button
          onClick={handleStepClick}
          disabled={searchState.phase === "FINISHED"}
        >
          Take a step
        </button>

        <button className="button button-clear" onClick={handleResetClick}>
          Reset
        </button>
        <div>
          <h5>Cities found:</h5>
          {searchState.citiesFound.map((_, index) => index + 1).join(",")}
        </div>
      </div>
      <div className="Info">Info</div>
      <div className="Map">
        <Map state={searchState} world={world} />
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 200px 0.8fr;
          grid-template-rows: 1.4fr 0.6fr;
          gap: 8px 8px;
          grid-auto-flow: row;
          grid-template-areas:
            "Controls Map"
            "Info Info";
        }

        .Controls {
          grid-area: Controls;
        }

        .Map {
          grid-area: Map;
        }

        .Info {
          grid-area: Info;
        }

        .container {
          height: 100vh;
          margin: 8px;
        }

        .Controls {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Home;
