import React from 'react';
import "./Subtitles.css";
import axios from "axios";

class Subtitles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            loadingTimeEstimate: -1,
            time: 0
        };

        this.subs = undefined;
    }

    startSubs(){
        let self = this;
        setInterval(() => {
            self.fetchSubtitles();
        }, 1000);
    }

    fetchSubtitles() {
        if (!this.state.isLoaded) {
            let self = this;
            let url = "http://127.0.0.1:8009/subtitles?id=" + this.props.videoId + "&language=" + this.props.language;
            //let url = "http://128.199.46.26:8009/subtitles?id=" + this.props.videoId+"&language="+this.props.language;
            axios.get(url)
                .then(function (response) {
                    console.log(response.data)
                    if (response["data"]["status"] === "done") {
                        self.state = {
                            isLoaded: true,
                            loadingTimeEstimate: response.data.loadingTimeEstimate,
                            time: self.state.time
                        }
                        self.subs = response.data["subtitles"];
                    } else {
                        let loadingTime = 0;
                        const TIME_PER_SECOND = 2
                        loadingTime += response.data["item"]["duration"] * TIME_PER_SECOND - response.data["item"]["time_generating"] + 60;
                        for (let i = 0; i < response.data["prior_queue"].length; i++) {
                            loadingTime += response.data["prior_queue"][i]["duration"] * TIME_PER_SECOND - response.data["prior_queue"][i]["time_generating"] + 60;
                        }
                        loadingTime = Math.max(0, loadingTime);
                        self.state = {
                            isLoaded: false,
                            loadingTimeEstimate: Math.round(loadingTime),
                            time: self.state.time
                        }
                    }
                })
        }
    }

    render() {
        if (!this.state.isLoaded) {
            if (this.state.loadingTimeEstimate > 0) {
                return <div className="loading_text">
                    <p className="subs">Subtitles are loading, ≈{this.state.loadingTimeEstimate} seconds left</p>
                </div>
            } else {
                return <div className="loading_text">
                    <p className="subs">Subtitles are loading</p>
                </div>
            }
        } else {
            let line = "";
            for (let i = 0; i < this.subs.length; i++) {
                let sub = this.subs[i];
                if (sub["from"] <= this.state.time && sub["to"] >= this.state.time) {
                    line = sub["text"];
                }
            }

            let softLimit = 50
            let hardLimit = 160
            let maxFont = 20
            let minFont = 10

            if (line.length > hardLimit) {
                line = line.substring(0, hardLimit - 3) + "...";
            }

            if (line.length < softLimit) {
                return <h1 className="subs">{line}</h1>
            } else {
                //let font_size = Math.min(20 - (line.length - softLimit) / ((maxFont - minFont)/(hardLimit - softLimit)), minFont);
                //return <h1 className="subs" style={{fontSize: font_size + "px"}}>{line}</h1>


                let bestIndex = Math.round(line.length / 2);
                let bestScore = line.length;
                for (let i = Math.round(line.length * 0.25); i < Math.round(line.length * 0.75); i++) {
                    if (line[i] === " ") {
                        let score = Math.abs(i - line.length / 2);
                        if (score < bestScore) {
                            bestScore = score;
                            bestIndex = i;
                        }
                    }
                }
                let line1 = line.substring(0, bestIndex);
                let line2 = line.substring(bestIndex + 1, line.length);


                return <h1 className="subsMultiline">{line1}<br></br>{line2}</h1>
                //return <h1>This is the first line of my heading.<br></br>This is the second line of my heading.</h1>
            }
        }
    }
}

export default Subtitles;