/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const LinkEpisodes = ({items}) => {
    let el ="";
    let slug = useLocation().pathname;
    if(items !== undefined){ 
        slug += `/${items[0].anime_episode_number}`
        el =<img src={items[0].bg ? items[0].bg : items[[...items].length - 1].bg} className=" w-full h-full rounded-t-2xl"/>
    }else{
        el= <h1 className="">xxxxxxxxxxx</h1>
        slug +=  `/${slug}/404}`
    }
    return ( 
        <NavLink  to={slug} >
        <div className=" w-[280px]  flex flex-col justify-center items-center">
            {el}
           <div className='flex flex-col justify-start items-start  w-full text-xs bg-gray-900 text-white gap-2 rounded-b-2xl'>
            <p className='mx-2 mt-2 font-bold text-lg'>Odcinek {items!== undefined ? items[0].anime_episode_number: ""}</p>
            <p className='mx-2 mb-3 font-light text-xs'>{items!== undefined ? items[0].created_at.slice(0, 10): ""}</p>
            </div> 
        </div>
        </NavLink>   
    );
}

export default LinkEpisodes;
