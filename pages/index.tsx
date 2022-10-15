import type { NextPage } from "next";
import { map, randomHometown } from "../map";
import { cityName, initState, initWorld, step } from "../model";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { salesman, ShortestPath } from "../salesman";

const speed = 50;

const Home: NextPage = () => {
  const [world, setWorld] = useState(initWorld(map, randomHometown()));
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
  }, [searchState.phase, searchState.citiesFound, searchState.graph]);

  useEffect(() => {
    if (play && searchState.phase !== "FINISHED") {
      const interval = setInterval(() => {
        setSearchState((state) => step(state, world));
      }, speed);
      return () => clearInterval(interval);
    }
  }, [play, searchState.phase]);

  const handleStepClick = () => {
    if (searchState.phase !== "FINISHED") {
      setSearchState((currentState) => step(currentState, world));
    }
  };

  const handleResetClick = () => {
    const world = initWorld(map, randomHometown());
    setWorld(world);
    setSearchState(initState(world));
    setShortestPath(null);
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
          <b>Step #</b>
          <div>{searchState.stepCount}</div>
        </div>

        <div>
          <b>Cities found:</b>
          <div>
            {searchState.citiesFound
              .map((city) => cityName(city, searchState.citiesFound))
              .join(",")}
          </div>
        </div>

        <div className="shortestPath">
          <b>Shortest path for the next time:</b>
          {searchState.phase === "FINISHED" && shortestPath === null && (
            <div>Calculating shortest path...</div>
          )}
          {searchState.phase !== "FINISHED" && <div>Not known yet...</div>}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {shortestPath?.map((city, i) => (
              <div key={i}>
                {cityName(
                  searchState.citiesFound[city],
                  searchState.citiesFound
                )}
                {i < searchState.citiesFound.length && <span> &#x2192; </span>}
              </div>
            ))}
          </div>
        </div>
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

        .shortestPath > div > div {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};

export default Home;
