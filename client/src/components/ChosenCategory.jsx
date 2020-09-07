import React, { useState, useEffect } from 'react';
import VideoList from './VideoList.jsx';

function ChosenCategory(props) {

    return (
        <div>
            <h3>Chosen Category {props.categoryInfo.category}</h3>
            <VideoList />
        </div>
    )

}
export default ChosenCategory;