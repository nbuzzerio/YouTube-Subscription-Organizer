import React, { useState, useEffect } from 'react';

function Video({ videoData }) {

    const [hidden, setHidden] = useState('videoDescription');

    const showMore = (e) => {
        let className = (hidden === 'videoDescription' ? 'allVideoDescription' : 'videoDescription');
        setHidden(className);
    }

    return (
        <div className='videoContainer'>
            <a href={`https://youtu.be/${videoData.resourceId.videoId}`} target='_blank'>
                <img className='videoThumbnail' src={videoData.thumbnails.medium.url} alt="Thumbnail" />
            </a>
            <a className='videoTitle' href={`https://youtu.be/${videoData.resourceId.videoId}`} target='_blank' >
               {videoData.title.length < 65 ? videoData.title : videoData.title.slice(0, 62).trim() + '...'}
            </a>
            <div className={hidden}>{videoData.description}</div>
            <div className='showMoreBtn' onClick={showMore}>{hidden === 'videoDescription' ? 'Show More' : 'Show Less'}</div>
        </div>
    )

}
export default Video;