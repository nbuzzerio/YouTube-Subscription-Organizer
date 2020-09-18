import React, { useState, useEffect } from 'react';
import Video from './Video.jsx';
import getSubVideos from './_getSubVideos.js';
import sorter from './sorter.js'

function VideoList({ categorySubs }) {

    const [videos, setSubVideos] = useState([]);

    const channelIds = categorySubs.map((sub) => {
        return sub.Channel_Id;
    })

    useEffect(() => {
        let mounted = true;
        
        if (channelIds.length > 0) {
            getSubVideos(channelIds)
                .then(subsVideos => {

                    let videos = [];
                    subsVideos.forEach( (subVideos) => {
                        subVideos.data.items.forEach( (subVideo) => {
                            subVideo.snippet.date = Date.parse(subVideo.snippet.publishedAt);
                            videos.push(subVideo.snippet);
                        })
                    });

                    let sortedVideoList = sorter(videos)

                    if (mounted) {
                        setSubVideos(sortedVideoList);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        return () => {
            mounted = false;
        }
    }, [categorySubs])

    console.log('videos:', videos)
    let videoList = videos.map((video, i) => {
        return <Video videoData={video} key={i}/>
    });

    return (
        <div className='videoList'>
            <div className='videoListTitle'>Videos</div>
            {videoList}
        </div>
    )

}
export default VideoList;