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

        let self = this;
        this.subs = undefined;

        //self.fetchSubtitles();

        setInterval(() => {
            self.fetchSubtitles();
        }, 1000);
    }

    fetchSubtitles() {
        if (!this.state.isLoaded) {
            let self = this;
            let url = "http://127.0.0.1:8009/subtitles?id=" + this.props.videoId;
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
                        loadingTime += response.data["item"]["duration"] * TIME_PER_SECOND - response.data["item"]["time_generating"];
                        for (let i = 0; i < response.data["prior_queue"].length; i++) {
                            loadingTime += response.data["prior_queue"][i]["duration"] * TIME_PER_SECOND - response.data["prior_queue"][i]["time_generating"];
                        }
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
            if(this.state.loadingTimeEstimate !== -1) {
                return <div className="loading_text">
                    <p className="subs">Subtitles are loading, ≈{this.state.loadingTimeEstimate} seconds left</p>
                </div>
            }
            else{
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

            return <h1 className="subs">{line}</h1>
        }
    }
}

export default Subtitles;