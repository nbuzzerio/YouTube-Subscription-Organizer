import React, { useState, useEffect } from 'react';

function Sub({sub}) {
    return (
        <div>
            <h5>{sub.snippet.title}</h5>
            <img src={sub.snippet.thumbnails.default.url}></img>
        </div>
    )

};
export default Sub;