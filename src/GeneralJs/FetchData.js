//Fetch data for home screen or when website loads
async function FetchData(offset) {

        let myHeaders = new Headers();
        myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);
    
        let requestOptions = {
            method: 'GET',
            redirect:'follow',
            headers: myHeaders
        };
        let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?limit=${200}&offset=${offset}`, requestOptions)
        let toJson = await apiData.json()
        return toJson.results

}

export default FetchData