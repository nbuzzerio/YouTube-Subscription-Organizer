import React, { useState, useEffect } from 'react';

function Sub({ sub }) {
    return (
        <div>
            <h5>{sub.Channel_Name}</h5>
            <img src={sub.default_img_URL}></img>
        </div>
    )

};
export default Sub;