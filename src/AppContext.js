import React, { createContext, useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");
export const AppContext = createContext();
const Store = window.require("electron-store");

const AppProvider = ({ children }) => {
  const store = new Store();

  const [anime, setAnime] = useState({});
  const [profil, setProfil] = useState({});
  const [list, setList] = useState({});
  const [animeMovie, setAnimeMovie] = useState({});
  const [id, setId] = useState(store.get("id"));
  const [accepte, setAccepte] = useState(store.get("accepte"));

  const setIdAll = (id) => {
    store.set("id", id);
    setId(store.get("id"));
  };

  const setAccepteAll = (accepte) => {
    store.set("accepte", accepte);
    setAccepte(store.get("accepte"));
  };

  useEffect(() => {
    ipcRenderer.send("getProfile", `${id}`);
    ipcRenderer.on("onProfile", (e, d) => {
      setProfil(JSON.parse(d));
    });

    ipcRenderer.send("getListProfilet", `${id}`);
    ipcRenderer.on("onListProfilet", (e, d) => {
      setList(JSON.parse(d));
    });
  }, [id]);

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
    <AppContext.Provider
      value={{
        anime,
        animeMovie,
        profil,
        list,
        id,
        setIdAll,
        accepte,
        setAccepteAll,
        changeSeazon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
