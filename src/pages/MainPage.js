import React, {useState} from "react";
import './../App.css';
import detectBrowserLanguage from 'detect-browser-language'
import SearchResults from "./../components/search_results/SearchResults";
import {getLanguage} from "../utils";
import YouTube from "react-youtube";

const MainPage = () => {
    const [link, setLink] = useState("");
    const [subtitlesMode, setSubtitlesMode] = useState('og');

    const handleChange = (event) => {
        setLink(event.target.value);
    };

    function getId(youtubeLink) {
        if(youtubeLink.includes("youtube.com/watch?v=")) {
            const link = youtubeLink.split("v=")[1];
            const ampersandPosition = link.indexOf("&");
            if (ampersandPosition !== -1) {
                return link.substring(0, ampersandPosition);
            }
            return link;
        }
        else{
            return undefined;
        }
    }

    const handleSubtitlesModeChange = (event) => {
        setSubtitlesMode(event.target.value);
    };

    function handle() {
        let language = getLanguage(subtitlesMode);
        let id = getId(link);
        if(link !== undefined) {
            const newPageUrl = "/youtube_video?videoId=" + id + "&language=" + language;
            window.open(newPageUrl, "_blank")
        }
    }

    let videoComponent = <p></p>
    if(getId(link) !== undefined){
        videoComponent = <YouTube
            videoId={getId(link)}
            opts={{
                height: '390',
                width: '640',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                },
            }}
        />
    }

    return (
        <div>
            <div className='main-form'>
                <input style={{width: '100%'}}
                       type="text"
                       placeholder="Enter YouTube link"
                       value={link}
                       onChange={handleChange}
                />

                <div className="my-select-container">
                    <label for="my-select">Subtitles</label>
                    <select className="my-select" value={subtitlesMode} onChange={handleSubtitlesModeChange}>
                        <option value="og">Original</option>
                        <option value="tr">Translated</option>
                        <option value="du">Dual</option>
                    </select>
                </div>

                <button onClick={handle}>Go</button>
            </div>
            <div className='main-form'>
                {videoComponent}
            </div>
        </div>
    );
};

export default MainPage;