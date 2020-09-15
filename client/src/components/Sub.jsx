import React, { useState, useEffect } from 'react';

function Sub({ sub }) {
    return (
        <div className='singleSubContainer'>
            <img src={sub.default_img_URL}></img>
            <h5 className='subTitle'>{sub.Channel_Name}</h5>
        </div>
    )

};
export default Sub;