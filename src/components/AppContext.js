import React, { createContext, useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [animeTV, setAnimeTV] = useState({});
  const [animeMovie, setAnimeMovie] = useState({});

  useEffect(() => {
    ipcRenderer.send("start", "api");
    ipcRenderer.on("startOn", (e, d) => {
      setAnimeTV(JSON.parse(d).filter((item) => item.series_type !== "Movie"));
      setAnimeMovie(
        JSON.parse(d).filter((item) => item.series_type === "Movie")
      );
    });
  }, []);

  return (
    <AppContext.Provider value={{ animeTV, animeMovie }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
