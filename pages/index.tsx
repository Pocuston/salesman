import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="container">
      <div className="Controls">Controls</div>
      <div className="Info">Info</div>
      <div className="Map">Map</div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 300px 1fr;
          grid-template-rows: 0.8fr 1.2fr;
          gap: 0px 0px;
          grid-auto-flow: row;
          height: 100vh;
        }

        .Controls {
          grid-area: 1 / 1 / 3 / 2;
        }

        .Info {
          grid-area: 2 / 1 / 3 / 2;
        }

        .Map {
          grid-area: 1 / 2 / 3 / 3;
        }
      `}</style>
    </div>
  );
};

export default Home;
