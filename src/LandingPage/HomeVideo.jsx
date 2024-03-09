import React from 'react';
import './HomeVideo.css';

function homeVideo() {
  return (
    
    <>
    <div class="video-container">
        <video autoPlay muted loop id="background-video">
            <source src="src\multimedia\loop_video_final.mp4" type="video/mp4"/>
            Your browser does not support video tag.
        </video>
    </div>
    <div class="overlay"></div>
    </>
    );
}
export default homeVideo;