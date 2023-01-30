import "./SearchResults.css";
import Subtitles from "../subtitles/Subtitles";
import Card from "./Card";
import React from 'react';
import axios from "axios";
import {getServerUrl} from "../../utils";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.obtainingResults = false;
    }

    obtainResults(query, language, originalLanguage){
        let self = this;
        this.obtainingResults = true;
        let url = getServerUrl()+"/search?"+
            "query=" + query +
            "&language=" + language +
            "&original_language=" + originalLanguage;
        axios.get(url)
            .then(function (response) {
                self.results = response.data;
                self.obtainingResults = false;
                self.forceUpdate();
            });
    }

    render() {
        let self = this;
        if(this.results === undefined){
            return <p></p>
        }
        else{
            for(let i = 0; i<self.results.length; i++){
                self.results[i]["key"] = i;
            }

            let res = (
                <div className="search-result">
                    {self.results.map((item) => (
                        <Card item={item}></Card>
                    ))}
                </div>
            );
            return res;
        }
    }
}

export default SearchResults;