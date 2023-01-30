import React from 'react';
import "./Subtitles.css";
import axios from "axios";
import {getServerUrl} from "../../utils";

class Subtitles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            loadingTimeEstimate: -1,
            time: 0
        };

        this.started = false;
        this.originalSubtitles = undefined;
        this.translationSubtitles = undefined;
        this.hintSubtitles = undefined;
        this.type = undefined;
    }

    startSubs() {
        if (!this.started) {
            this.started = true;
            let self = this;
            setInterval(() => {
                self.fetchSubtitles();
            }, 10000);
            self.fetchSubtitles();
        }
    }

    displaySubs(line, className) {
        let softLimit = 50
        let hardLimit = 160
        let maxFont = 20
        let minFont = 10

        if (line.length > hardLimit) {
            line = line.substring(0, hardLimit - 3) + "...";
        }

        if (line.length < softLimit) {
            return [<h1 className={className}>{line}</h1>, false]
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

            return [<h1 className={className}>{line1}<br></br>{line2}</h1>, true]
        }
    }

    fetchSubtitles() {
        if (!this.state.isLoaded) {
            let self = this;
            let url = getServerUrl()+"/subtitles?id=" + this.props.videoId + "&language=" + this.props.language;
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
                        self.type = response.data["type"]
                        if (self.type === "singular_og") {
                            self.originalSubtitles = response.data["subtitles"];
                        }
                        if (self.type === "singular_translation") {
                            self.translationSubtitles = response.data["subtitles"];
                        }
                        if (self.type === "dual") {
                            self.originalSubtitles = response.data["original"];
                            self.translationSubtitles = response.data["translation"];
                        }
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

    findSubtitleLine(subs) {
        let line = "";
        for (let i = 0; i < subs.length; i++) {
            let sub = subs[i];
            if (sub["from"] <= this.state.time && sub["to"] >= this.state.time) {
                line = sub["text"];
            }
        }
        return line;
    }

    render() {
        if (!this.state.isLoaded) {
            if (this.state.loadingTimeEstimate > 0) {
                return <p className="subs-regular">Subtitles are loading, ≈{this.state.loadingTimeEstimate} seconds left</p>

            } else {
                return <p className="subs-regular">Subtitles are loading</p>
            }
        } else {
            if (this.type === "singular_og" || this.type === "singular_translation") {
                let subs = this.originalSubtitles;
                if (this.type === "singular_translation") {
                    subs = this.translationSubtitles;
                }
                let line = this.findSubtitleLine(subs);
                let [displayed, multiline] = this.displaySubs(line, "subs-regular");
                return displayed;
            }
            if (this.type === "dual") {
                let lineOriginal = this.findSubtitleLine(this.originalSubtitles);
                let lineTranslation = this.findSubtitleLine(this.translationSubtitles);

                let [displayed1, multiline1] = this.displaySubs(lineTranslation, "subs-dual-1");
                let [displayed2, multiline2] = this.displaySubs(lineOriginal, "subs-dual-2");

                if(multiline1) {
                    return <div className="subs-div" style={{gap: "65vh"}}>
                        {displayed1}
                        {displayed2}
                    </div>
                }
                else{
                    if(lineTranslation !== "") {
                        return <div className="subs-div" style={{gap: "69vh"}}>
                            {displayed1}
                            {displayed2}
                        </div>
                    }
                    else{
                        return <div className="subs-div" style={{gap: "73vh"}}>
                            {displayed1}
                            {displayed2}
                        </div>
                    }
                }
            }
        }
    }
}

export default Subtitles;