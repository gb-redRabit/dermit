import React from 'react';
import {NavLink} from 'react-router-dom';


const ItemAnime = ({item}) => {
    // console.log(item)
    return (
    <NavLink  to={`/anime/${item.slug}`}>
        <div className="w-60 h-80 m-3 relative rounded-md overflow-hidden"> 
            <img src={item.cover} alt="item" className="w-full h-full"/>
            <div className="absolute top-0 right-0 flex justify-center items-center w-7 h-7 rounded-bl-lg  text-white bg-slate-400 ">
            {item.episodes > 0 ? item.episodes: "?"}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 flex justify-center p-1 items-center text-center text-sm text-white bg-[rgba(0,0,0,0.5)] cursor-pointer hover:bg-[rgba(0,0,0,0.8)]">{item.title}</div>
        </div>
    </NavLink>
    );
}

export default ItemAnime;

// adult_content :  "false"
// aired_from: "2023-03-17T00:00:00+00:00"
// broadcast_day: "Wednesdays"
// cover: "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg"
// episodes: 11
// genres: (3) ['Drama', 'Supernatural', 'Seinen']
// mal_id: 52034
// season: "spring"
// season_year: 2023
// series_type: "TV"
// slug: "oshi-no-ko"
// title: "\"Oshi no Ko\""
// title_en: "My Star"