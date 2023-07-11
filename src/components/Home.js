import React, { useState, useEffect } from "react";
// Import element componets
import Breadcrumbs from "./Breadcrumbs";
import Typography from "./Typography";
import Swip from "./Swip";

// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Home = () => {
  const [data, setData] = useState();
  const [dataAnime, setDataAnime] = useState({ hits: [] });
  const [dataNewAnime, setDataNewAnime] = useState({ hits: [] });
  const [dataNotAnime, setDataNotAnime] = useState({ hits: [] });
  useEffect(() => {
    ipcRenderer.send("start", "api");
    ipcRenderer.on("startOn", (e, d) => {
      setDataAnime(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    ipcRenderer.send(
      "api",
      `https://api.docchi.pl/v1/episodes/latest?season=${changeSeazon()}&season_year=${new Date().getFullYear()}"`
    );
    ipcRenderer.on("apiSend", (e, d) => {
      setDataNewAnime(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    ipcRenderer.send(
      "apiTwo",
      `https://api.docchi.pl/v1/episodes/latest?season=${changeSeazon()}&season_year=${new Date().getFullYear()}&type=not`
    );
    ipcRenderer.on("apiSendTwo", (e, d) => {
      setDataNotAnime(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    if (dataAnime[0]) {
      setData(
        dataAnime.filter(
          (value) =>
            value.season_year === new Date().getFullYear() &&
            value.season === changeSeazon()
        )
      );
    }
  });

  const changeSeazon = (language) => {
    const month = new Date().getMonth();
    if (language !== "pl") {
      if (month <= 2) {
        return "winter";
      }
      if (month > 2 && month <= 5) {
        return "spring";
      }
      if (month > 5 && month <= 8) {
        return "summer";
      }
      if (month > 8 && month <= 11) {
        return "fall";
      }
    } else {
      if (month <= 2) {
        return "Jesień";
      }
      if (month > 2 && month <= 5) {
        return "Wiosna";
      }
      if (month > 5 && month <= 8) {
        return "Lato";
      }
      if (month > 8 && month <= 11) {
        return "Zima";
      }
    }
  };

  if (data !== undefined) {
    return (
      <div
        className=" flex flex-col overflow-hidden justify-start items-center min-h-screen w-[80vw] mx-auto"
        style={{ maxWidth: "calc(100vw - 81px)" }}
      >
        <Breadcrumbs />
        <Typography
          text={`${changeSeazon("pl")} ${new Date().getFullYear()}`}
        />
        <Swip data={dataAnime} />
        <Typography text={`Nowe odcinki`} />
        <Swip data={dataNewAnime} type="grid" />
        <Typography text={`Nieemitowane odcinki`} />
        <Swip data={dataNotAnime} type="grid" />
      </div>
    );
  }
};

export default Home;
