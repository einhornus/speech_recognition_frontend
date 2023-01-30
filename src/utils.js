import detectBrowserLanguage from 'detect-browser-language'
import { useState, useEffect } from 'react';

const IS_LOCAL = true;

export let getLanguage = (subtitlesMode) => {
    let language = 'og';
    let nativeLanguage = "en";//detectBrowserLanguage();
    if(subtitlesMode === "tr"){
        language = nativeLanguage;
    }
    if(subtitlesMode === "du"){
        language = "og_"+nativeLanguage;
    }
    return language;
}


export function getServerUrl(){
    if(IS_LOCAL){
        return "http://localhost:8009";
    }
    else{
        return "http://128.199.46.26:8009";
    }
}