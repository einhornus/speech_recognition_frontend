import logo from './../logo.svg'
import './../App.css';
import React from 'react';
import SubtitlesPlayer from "./../components/subtitles_player/SubtitlesPlayer";
import FullScreen, {fullScreenSupported} from 'react-request-fullscreen';
import {useSearchParams} from "react-router-dom";


import { useState, useRef } from 'react';

function YouTubeVideoPage() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();

    const player = useRef();
    const fullScreenRef = useRef();

    function onFullScreenChange(isFullScreen) {
        setIsFullScreen(isFullScreen);
        player.current.setState({isFullScreen});
    }

    function requestOrExitFullScreen() {
        fullScreenRef.current.fullScreen();
    }

    return (
        <div className='app'>
            <SubtitlesPlayer ref={player} videoId={searchParams.get("videoId")} />
            <FullScreen ref={fullScreenRef} onFullScreenChange={onFullScreenChange}>
                <div
                    onClick={requestOrExitFullScreen}
                >
                    <img src={logo} className="fullScreenButton" width={50} height={50}/>
                </div>
            </FullScreen>
        </div>
    );
}

export default YouTubeVideoPage;