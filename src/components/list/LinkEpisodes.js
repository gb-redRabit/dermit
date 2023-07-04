/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const LinkEpisodes = ({items}) => {
    let el ="";
    let slug = useLocation().pathname;
    if(items !== undefined){ 
        slug += `/${items[0].anime_episode_number}`
        el =<img src={items[0].bg ? items[0].bg : items[[...items].length - 1].bg} className=" w-full h-full"/>
    }else{
        el= <h1 className="">x</h1>
        slug +=  `/${slug}/404}`
    }
    return ( 
        <NavLink  to={slug} >
        <div className="w-40 h-28 flex justify-center items-center">
            {el}
            
        </div>
        </NavLink>   
    );
}

export default LinkEpisodes;
