import React from 'react';

const Aaa = ({items}) => {
    return (
        <div className="w-40 h-28">
            <img src={items[0].bg ? items[0].bg : ""} className=" w-full h-full"/>
        </div>
    );
}

export default Aaa;
