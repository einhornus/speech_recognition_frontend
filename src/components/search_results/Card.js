import React from 'react';
import "./Card.css";

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {hover: false}
    }

    setHover(hover){
        this.setState({hover: hover})
    }

    handleClick = event => {
        const item = this.props.item;
        console.log(item)
        const newPageUrl = "/youtube_video?videoId=" + item["id"] + "&language=" + item["language"];
        window.open(newPageUrl, "_blank")
    };

    render() {
        let MAX_SIZE = 40;
        const item = this.props.item;

        let title = item["title"];
        if(title.length > MAX_SIZE){
            title = title.substring(0, MAX_SIZE - 3)+"..."
        }

        let type1 = "card-image"
        let type2 = "card-title"
        if(this.state.hover){
            type1 += " card-image-hover"
            type2 += " card-title-hover"
        }

        return (
            <div className="card-container" onClick={this.handleClick} onMouseEnter={() => this.setHover(true)}  onMouseLeave={() => this.setHover(false)}>
                <img className={type1} src={item["thumbnail"]} alt={item["title"]}/>
                <div className={type2}>
                    {title}
                </div>
            </div>
        );
    }
}

export default Card;