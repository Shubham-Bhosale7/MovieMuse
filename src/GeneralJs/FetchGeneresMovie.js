// Takes genres as an argument and fetch data according to that
async function FetchGeneresMovie(generes, movieAndSeriesOffset, setMovieAndSeriesOffset, relatedMovesOffset, setRelatedMoviesOffset, relatedSeriesOffset, setRelatedSeriesOffset, setRelatedMoviesMaxLimit, setRelatedSeriesMaxLimit) {
    // This function takes in a list of genera code and use the codes to fetch the elements of the codes.

    var myHeaders = new Headers();
    myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${generes}&limit=200&offset=${movieAndSeriesOffset}`, requestOptions)
    let toJson = await apiData.json()
    let results = toJson.results
    setMovieAndSeriesOffset(movieAndSeriesOffset + 200)
    setRelatedMoviesOffset(relatedMovesOffset + 200)
    setRelatedSeriesOffset(relatedSeriesOffset + 200)
    let maxMoviesLimit = 0
    let maxSeriesLimit = 0
    results.map((item) => {
        if (item.title_type == 'movies') {
            maxMoviesLimit += 1
        }
        else {
            maxSeriesLimit += 1
        }
    })
    setRelatedMoviesMaxLimit(maxMoviesLimit)
    setRelatedSeriesMaxLimit(maxSeriesLimit)
    return results
}

export default FetchGeneresMovie