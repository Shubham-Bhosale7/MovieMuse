// Takes genres as an argument and fetch data according to that
async function FetchGeneresMovie(generes, offset, setOffset, setMax) {

    var myHeaders = new Headers();
    myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${generes}&limit=200&offset=${offset}`, requestOptions)
    let toJson = await apiData.json()
    // console.log('FLAG3', toJson)
    let results = toJson.results
    let newOffset = offset + 100
    // console.log('FLAG 4', offset)
    setOffset(newOffset)
    // console.log('FLAG5', newOffset)
    let maxLimit = toJson.Object['total']
    // console.log('FLAG6', maxLimit)
    setMax(maxLimit)
    console.log('FLAG Y', results)
    return results
}

export default FetchGeneresMovie