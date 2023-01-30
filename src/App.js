import logo from './logo.svg';
import './App.css';
import React from 'react';
import SubtitlesPlayer from "./components/subtitles_player/SubtitlesPlayer";
import FullScreen, {fullScreenSupported} from 'react-request-fullscreen';
import YouTubeVideoPage from "./pages/YouTubeVideoPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isFullScreen: false
        }
        this.player = React.createRef();
    }

    render () {
        return (<BrowserRouter>
            <Routes>
                <Route path="/youtube_video" element={<YouTubeVideoPage></YouTubeVideoPage>}/>
                <Route path="/" element={<MainPage></MainPage>}/>
                <Route path="/search" element={<SearchPage></SearchPage>}/>
                <Route path="/settings" element={<SettingsPage></SettingsPage>}/>
            </Routes>
        </BrowserRouter>);
    }
}
export default App;