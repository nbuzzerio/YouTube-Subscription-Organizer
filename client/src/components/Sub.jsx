import React from 'react';

function Sub({ sub }) {

    const dragStart = (e) => { 
        e.dataTransfer.setData('channel_id', sub.Channel_Id);
    }

    return (
        <div className='singleSubContainer' onDragStart={dragStart} draggable={true}>
            <img className='subImg' src={sub.default_img_URL} onDragStart={dragStart} draggable={true}></img>
            <h5 className='subTitle'>{sub.Channel_Name}</h5>
        </div>
    )

};
export default Sub;