import React from 'react';
import ItemAnime from './ItemAnime';

const Filmy = ({animeMovie}) => {
    const list = animeMovie.map((item,key) => { 
        return <ItemAnime item={item} key={item.slug}/>
     })
     return (
         <div className='flex justify-center items-center flex-wrap'>
             {list}
         </div>
     );
}

export default Filmy;
