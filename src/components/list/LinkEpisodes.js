/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useLocation , NavLink } from 'react-router-dom';
import { IconContext } from "react-icons";
import { LuImageOff } from 'react-icons/lu';

const LinkEpisodes = ({items}) => {
    let el ;
    let src ;
    let slug = useLocation().pathname;
    const noImg = <IconContext.Provider value={{ className: "flex justify-center items-center p-10 text-white h-[130px] w-full bg-gray-800 rounded-t-2xl" }}><LuImageOff /></IconContext.Provider>
    if(items !== undefined){ 
        items.forEach(item =>{
            if(item.bg !== null){
                src= item.bg
            }
        })
        slug += `/${items[0].anime_episode_number}`
        if(src)
        el =<img src={src} className=" w-full h-full rounded-t-2xl"/>
        else
        el= noImg
    }else{
        el= noImg
        slug +=  `/404`
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
