import React, { useContext } from "react";

import { AppContext } from "../AppContext";

import Typography from "./Typography";

const Profil = () => {
  const { id, setIdAll, setAccepteAll, accepte } = useContext(AppContext);

  return (
    <div className="fixed top-0 left-16 w-screen h-screen z-50 bg-slate-900/95 flex flex-col justify-center  items-center">
      <Typography
        text={"Podaj ID Użytkownika z https://docchi.pl/profile/{id}"}
      />
      <Typography text={id} />
      <Typography text={accepte} />
      <Typography
        text={
          "Jeśli chcesz aby aplikacje była powiązano z twoją biblioteką użytkownika."
        }
        size="text-sm"
      />
      <div className=" flex flex-col overflow-hidden justify-start items-center  w-[90vw] mx-auto py-5 bg-slate-900 ">
        <form className="flex flex-col gap-4">
          <label>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setIdAll(e.target.value);
              }}
            />
          </label>

          <div className="flex gap-4 justify-center items-center">
            <input
              className="ext-sm flex justify-center items-center p-2  bg-gray-950 rounded text-white transition-all duration-300 ease-linear text-center hover:text-yellow-500 hover:bg-gray-600 cursor-pointer"
              type="submit"
              value="Anuluj"
              onClick={() => {
                setAccepteAll(false);
              }}
            />
            <input
              className="ext-sm flex justify-center items-center p-2  bg-gray-950 rounded text-white transition-all duration-300 ease-linear text-center hover:text-yellow-500 hover:bg-gray-600 cursor-pointer"
              type="submit"
              value="Potwierdzam"
              onClick={() => {
                setAccepteAll(true);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profil;
