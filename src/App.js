/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
// Import element componets
import Nav from "./components/Nav";
import AnimationRoutes from "./components/AnimationRoutes";
import { AppContext } from "./AppContext";
import Spinners from "./components/Spinners";

import { useLocation } from "react-router-dom";

function App() {
  const { anime, accepte, id } = useContext(AppContext);
  const [time, setTime] = useState(false);

  const location = useLocation().pathname;

  if (Object.keys(anime).length !== 0)
    setTimeout(() => {
      setTime(true);
    }, 10);

  return (
    <div className="flex min-h-screen relative">
      <Nav />
      <div
        className="bg-slate-950 ml-16 flex justify-center items-center"
        style={{ maxWidth: "calc(100vw - 64px)", width: "calc(100vw - 64px)" }}
      >
        {time ? <AnimationRoutes /> : <Spinners />}
      </div>
    </div>
  );
}

export default App;
