import React from 'react';
import "./Card.css";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {result} = this.props;
        return (
            <div className="search-result">
                <img src={result.image} alt={result.title}/>
                <div className="search-result-info">
                    {result.title}
                </div>
            </div>
        );
    }
}

export default Card;