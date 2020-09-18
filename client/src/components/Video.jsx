import React, { useState, useEffect } from 'react';

function Video({ videoData }) {
    return (
        <div className='videoContainer'>
            <img src={videoData.thumbnails.default.url} alt="Thumbnail"/>
            <a href={`https://youtu.be/${videoData.resourceId.videoId}`} target='_blank' >{videoData.title}</a>
            <br/>
        </div>
    )

}
export default Video;