import React, { useContext } from "react";

import { AppContext } from "../AppContext";

const Profil = () => {
  const { profil, list } = useContext(AppContext);
  return <div>{profil.nickname}</div>;
};

export default Profil;
