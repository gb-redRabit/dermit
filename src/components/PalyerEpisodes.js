import React from "react";

const PalyerEpisodes = ({ item, w, h }) => {
  let src;

  if (item.player_hosting.toUpperCase() === "CDA") {
    const lastIndex = item.player.lastIndexOf("/");
    const lenghtPlayer = item.player.length;
    src = `https://dreamscenter.app/player?url=https://www.cda.pl/video/${item.player.slice(
      lastIndex + 1,
      lenghtPlayer
    )}&color=ffffff`;
  } else {
    src = item.player;
  }

  return (
    <iframe
      src={src}
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allow="clipboard-write"
      title="player"
      className="z-10 "
      style={{
        width: `${window.innerWidth * 0.7}px`,
        height: `${window.innerHeight * 0.7}px`,
      }}
    />
  );
};

export default PalyerEpisodes;
