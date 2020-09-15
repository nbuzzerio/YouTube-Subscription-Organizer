import React, { useState, useEffect } from 'react';

function Sub({ sub }) {
    return (
        <div className='singleSubContainer'>
            <img className='subImg' src={sub.default_img_URL} draggable></img>
            <h5 className='subTitle'>{sub.Channel_Name}</h5>
        </div>
    )

};
export default Sub;