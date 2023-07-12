import React, { createContext, useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [anime, setAnime] = useState({});
  const [animeMovie, setAnimeMovie] = useState({});

  useEffect(() => {
    ipcRenderer.send("start", "api");
    ipcRenderer.on("startOn", (e, d) => {
      setAnime(JSON.parse(d));
      setAnimeMovie(
        JSON.parse(d).filter((item) => item.series_type === "Movie")
      );
    });
  }, []);

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

  return (
    <AppContext.Provider value={{ anime, animeMovie, changeSeazon }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
