import React, { useState } from "react";
import "./pages.css";
import "./../components/search_results/SearchResults.js";

const MainPage = () => {
    const [originalLanguage, setOriginalLanguage] = useState('an');
    const [subtitlesMode, setSubtitlesMode] = useState('tr');
    const [searchTerm, setSearchTerm] = useState('');

    const handleOriginalLanguageChange = (event) => {
        setOriginalLanguage(event.target.value);
    };

    const handleSubtitlesModeChange = (event) => {
        setSubtitlesMode(event.target.value);
    };

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        console.log(`Searching for ${searchTerm} with original language ${originalLanguage} and subtitles mode ${subtitlesMode}`);
        // perform the search here with the provided data
    }

    return (
        <div className="search-form">
            <input type="text" placeholder="Search..." onChange={handleSearchInput} value={searchTerm}/>
            <div className="my-select">
                <label>Original Language</label>
                <select value={originalLanguage} onChange={handleOriginalLanguageChange}>
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
                    <option value="hr">Serbo-Croatian</option>
                    <option value="uk">Ukrainian</option>
                    <option value="tr">Turkish</option>
                    <option value="id">Indonesian</option>
                </select>
            </div>

            <div className="my-select">
                <label>Subtitles Mode</label>
                <select value={subtitlesMode} onChange={handleSubtitlesModeChange}>
                    <option value="og">Original</option>
                    <option value="tr">Translation</option>
                    <option value="du">Dual</option>
                    <option value="dh">Dual with hints</option>
                </select>
            </div>

            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default MainPage;