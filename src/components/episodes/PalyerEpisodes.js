import React from 'react';

const PalyerEpisodes = ({item}) => {
    let src;
    if(item.player_hosting  === "CDA"){
        const lastIndex = item.player.lastIndexOf('/');
        const lenghtPlayer= item.player.length;
        src =(`https://ebd.cda.pl/800x500/${item.player.slice(lastIndex +1 , lenghtPlayer)}`)
    } else{
        src = (item.player)
    }

    return (
        <iframe className="w-[800px] h-[500px]" src={src} title="player" scrolling="no"/>
    );

}

export default PalyerEpisodes;
