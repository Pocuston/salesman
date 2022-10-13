import type { NextPage } from "next";
import { hometown, map } from "../map";
import { cityName, initState, initWorld, step } from "../model";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { salesman, ShortestPath } from "../salesman";

const world = initWorld(map, hometown);

const Home: NextPage = () => {
  const [searchState, setSearchState] = useState(() => initState(world));
  const [play, setPlay] = useState(false);
  const [shortestPath, setShortestPath] = useState<ShortestPath | null>(null);

  useEffect(() => {
    if (searchState.phase !== "FINISHED") {
      setShortestPath(null);
    } else {
      const path = salesman(searchState.citiesFound, searchState.graph);
      setShortestPath(path);
    }
  }, [searchState.phase]);

  useEffect(() => {
    if (play && searchState.phase !== "FINISHED") {
      const interval = setInterval(() => {
        setSearchState((state) => step(state, world));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [play]);

  const handleStepClick = () => {
    if (searchState.phase !== "FINISHED") {
      setSearchState((currentState) => step(currentState, world));
    }
  };

  const handleResetClick = () => {
    setSearchState(initState(world));
    setPlay(false);
  };

  function handlePlayClick() {
    setPlay((current) => !current);
  }

  return (
    <div className="container">
      <div className="Controls">
        <div className="player">
          <button
            className="button"
            onClick={handlePlayClick}
            disabled={searchState.phase === "FINISHED"}
          >
            {play ? "Stop" : "Play"}
          </button>

          <button
            onClick={handleStepClick}
            disabled={searchState.phase === "FINISHED"}
          >
            Step
          </button>
        </div>

        <button
          className={searchState.phase !== "FINISHED" ? "button-clear" : ""}
          onClick={handleResetClick}
        >
          Reset
        </button>
        <div>
          <b>Cities found:</b>
          <div>
            {searchState.citiesFound
              .map((city) => cityName(city, searchState.citiesFound))
              .join(",")}
          </div>
        </div>
        {shortestPath && (
          <div className="shortestPath">
            <b>Shortest path from hometown:</b>
            <div>
              {shortestPath
                .map((city) =>
                  cityName(
                    searchState.citiesFound[city],
                    searchState.citiesFound
                  )
                )
                .join("-")}
            </div>
          </div>
        )}
      </div>
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
          grid-template-areas: "Controls Map";
        }

        .Controls {
          grid-area: Controls;
        }

        .Map {
          grid-area: Map;
        }

        .container {
          height: 100vh;
          margin: 8px;
        }

        .Controls {
          display: flex;
          flex-direction: column;
        }

        .player {
          display: flex;
          flex-direction: row;
        }

        .player > button {
          margin-right: 8px;
        }

        .shortestPath {
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default Home;
