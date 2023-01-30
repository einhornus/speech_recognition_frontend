import React, {useRef, useState} from "react";
import "./pages.css";
import "./../components/search_results/SearchResults.js";
import SearchResults from "../components/search_results/SearchResults";
import detectBrowserLanguage from 'detect-browser-language'
import {getLanguage} from "../utils";
import {useEffect} from 'react';

const MainPage = () => {
    let [originalLanguage, setOriginalLanguage] = useState('an');
    let [subtitlesMode, setSubtitlesMode] = useState('og');
    let [searchTerm, setSearchTerm] = useState('');
    let searchResults = useRef();

    const handleOriginalLanguageChange = (event) => {
        setOriginalLanguage(event.target.value);
        console.log("stuff", subtitlesMode, event.target.value)
        handleSearch(subtitlesMode, event.target.value)
    };

    const handleSubtitlesModeChange = (event) => {
        setSubtitlesMode(event.target.value);
        handleSearch(event.target.value, originalLanguage)
    };

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    }

    function handleKeyDown(event) {
        setSearchTerm(event.target.value);
        if (event.keyCode === 13) {
            handleSearch();
        }
    }

    function handleSearch(_subtitlesMode = subtitlesMode, _originalLanguage = originalLanguage){
        let language = getLanguage(_subtitlesMode);
        searchResults.current.obtainResults(searchTerm, language, _originalLanguage);
        console.log(`Searching for ${searchTerm} with original language ${_originalLanguage} and subtitles mode ${_subtitlesMode}`);
    }

    function handleSearchButton(){
        let language = getLanguage(subtitlesMode);
        searchResults.current.obtainResults(searchTerm, language, originalLanguage);
        console.log(`Searching for ${searchTerm} with original language ${originalLanguage} and subtitles mode ${subtitlesMode}`);
    }


    useEffect(() => {
        handleSearch()
    }, []);

    return (
        <div>
            <div className="search-form">
                <input type="text" className="search-box" placeholder="Search..." onChange={handleSearchInput} onKeyDown={handleKeyDown}
                       value={searchTerm}/>
                <div className="my-select-container">
                    <label for="my-select">Original Language</label>
                    <select className="my-select" value={originalLanguage} onChange={handleOriginalLanguageChange}>
                        <option value="an">Any</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="ja">Japanese</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="pt">Portuguese</option>
                        <option value="ru">Russian</option>
                        <option value="it">Italian</option>
                        <option value="ko">Korean</option>
                        <option value="nl">Dutch</option>
                        <option value="pl">Polish</option>
                        <option value="hr">Croatian</option>
                        <option value="uk">Ukrainian</option>
                        <option value="tr">Turkish</option>
                        <option value="id">Indonesian</option>
                        <option value="cs">Czech</option>
                        <option value="sk">Slovak</option>
                        <option value="sv">Swedish</option>
                        <option value="no">Norwegian</option>
                        <option value="da">Danish</option>
                        <option value="fi">Finnish</option>
                        <option value="th">Thai</option>
                    </select>
                </div>

                <div className="my-select-container">
                    <label for="my-select">Subtitles</label>
                    <select className="my-select" value={subtitlesMode} onChange={handleSubtitlesModeChange}>
                        <option value="og">Original</option>
                        <option value="tr">Translated</option>
                        <option value="du">Dual</option>
                    </select>
                </div>

                <button onClick={handleSearchButton}>Search</button>
            </div>
            <div>
                <SearchResults ref={searchResults}></SearchResults>
            </div>
        </div>
    );
};

export default MainPage;