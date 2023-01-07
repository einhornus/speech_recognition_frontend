import React, {createRef, useEffect} from 'react';
import Subtitles from "../subtitles/Subtitles";
import "./SubtitlesPlayer.css";
import YouTube from "react-youtube";


class SubtitlesPlayer extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        this.state = {isFullScreen: false};
        this.subtitles = createRef();
        this.youtube = createRef();

        setInterval(() => {
            self.onTimer();
        }, 50);
    }

    componentDidMount() {
        if(this.youtube.current) {
            //this.youtube.current.focus()
        }
    }

    render() {
        let opts = undefined;
        if (this.state.isFullScreen) {
            opts = {
                width: '1250',
                height: '700',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 1,
                    fs: 0,
                    iv_load_policy: 3
                },
            };
        } else {
            opts = {
                width: '1200',
                height: '580',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 1,
                    fs: 0,
                    iv_load_policy: 3
                },
            };
        }

        return <div className="playerContainer">
            <YouTube
                videoId={this.props.videoId}
                onReady={this.onReady.bind(this)}
                onPlay={this.onPlay.bind(this)}
                onPause={this.onPause.bind(this)}
                onStateChange={this.onStateChange.bind(this)}
                onEnd={this.onEnd.bind(this)}
                onPlaybackRateChange={this.onPlaybackRateChange.bind(this)}
                ref={this.youtube}
                opts={opts}
            />

            <Subtitles ref={this.subtitles} videoId={this.props.videoId}>
            </Subtitles>
        </div>
    }

    onStateChange(event) {
    }

    onPlaybackRateChange(event) {
    }

    onEnd(event) {
    }

    onPlay(event) {
    }

    onPause(event) {
    }

    onReady(event) {
        //event.target.pauseVideo();
    }

    onTimer() {
        let self = this;
        if (this.youtube.current) {
            if (this.youtube.current.internalPlayer) {
                this.youtube.current.internalPlayer.getCurrentTime().then((val) => {
                    self.subtitles.current.setState({
                        isLoaded: this.subtitles.current.state.isLoaded,
                        loadingTimeEstimate: this.subtitles.current.state.loadingTimeEstimate,
                        time: val * 1000
                    })
                })
            }
        }
    }
}

export default SubtitlesPlayer;