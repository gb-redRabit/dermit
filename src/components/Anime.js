import React from 'react';
import ItemAnime from './list/ItemAnime';

const Anime = ({animeTV}) => {
  const list = animeTV.map((item,id) => { 
       return <ItemAnime item={item} key={id} />
    })
    return (
        <div className='flex justify-center items-center flex-wrap '>
            {list}
        </div>
    );
}

export default Anime;
