import React from 'react';

const PalyerEpisodes = ({item,w,h}) => {
    let src;
    if(item.player_hosting  === "CDA"){
        const lastIndex = item.player.lastIndexOf('/');
        const lenghtPlayer= item.player.length;
        src =(`https://ebd.cda.pl/${w}x${h}/${item.player.slice(lastIndex +1 , lenghtPlayer)}`)
    } else{
        src = (item.player)
    }

    return (
        <iframe src={src} title="player" scrolling="no" className="z-10" style={{ width: `${w}px`, height: `${h}px` }}/>
    );

}

export default PalyerEpisodes;
