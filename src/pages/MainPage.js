import React, { useState } from "react";
import './../App.css';
import detectBrowserLanguage from 'detect-browser-language'
import SearchResults from "./../components/search_results/SearchResults";

const MainPage = () => {
    const [link, setLink] = useState("");

    const handleChange = (event) => {
        setLink(event.target.value);
    };

    function getId(youtubeLink){
        const link = youtubeLink.split("v=")[1];
        const ampersandPosition = link.indexOf("&");
        if(ampersandPosition !== -1) {
            return link.substring(0, ampersandPosition);
        }
        return link;
    }

    function handle() {
        let lang = detectBrowserLanguage();
        console.log(lang)
        let id = getId(link);
        const newPageUrl = "/youtube_video?videoId=" + id + "&language=og";
        window.open(newPageUrl, "_blank")
    }

    return (
        <div className='main-form'>
            <input style={{width: '100%'}}
                type="text"
                placeholder="Enter YouTube link"
                value={link}
                onChange={handleChange}
            />

            <button onClick={handle}>Go</button>
        </div>



    );
};

export default MainPage;