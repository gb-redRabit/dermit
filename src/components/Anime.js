import React from 'react';
import ItemAnime from './list/ItemAnime';
import { useState,useEffect, useRef} from 'react';
import Genres from './Genres';

const Anime = ({animeTV}) => {
    const [genres, setGenres] = useState([]);
    let gen =[]

    useEffect(() => {
        animeTV.map((item,id) => { 
            gen = [...gen,...item.genres]
            gen =  Array.from(new Set(gen))
            setGenres(gen)
            
       return <ItemAnime item={item} key={id} />
    })
    },[])
    
    
    return (
        <div className='flex  flex-col justify-center items-center flex-wrap'>
            <div className='m-10 flex justify-center items-center flex-wrap'>
            {genres.map((text,id) => <Genres text={text} key={id} />)}
            </div>
            <div className='flex  justify-center items-center flex-wrap '>
            {animeTV.map((item,id) => <ItemAnime item={item} key={id} />)}
            </div>
        </div>
    );
}

export default Anime;
