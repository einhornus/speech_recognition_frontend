import "./SearchResults.css";


const SearchResults = (props) => {
    const {results} = props;

    return (
        <div className="search-results">
            {results.map((result) => {
                return (
                    <div className="search-result">
                        <img src={result.image} alt={result.title}/>
                        <div className="search-result-info">
                            <h3>{result.title}</h3>
                            <p>{result.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
