import React from 'react';

class LoadingInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areSubtitlesLoaded: false,
            loadingTimeEstimate: 0
        };
    }
}

export default LoadingInfo;