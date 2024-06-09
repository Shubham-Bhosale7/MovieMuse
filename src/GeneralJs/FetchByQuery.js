//Takes search query and fetch movies and series according to that.
async function FetchByQuery(query) {

    let myHeaders = new Headers();
    myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?title=${query}`, requestOptions)
    let toJson = await apiData.json()
    return toJson.results

}
export default FetchByQuery