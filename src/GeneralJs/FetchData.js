//Fetch data for home screen or when website loads

async function FetchData(offset, navigate) {

    let myHeaders = new Headers();
    myHeaders.append("apikey", `c98JcNXxEUlHpsP5c53Wf3vtY3EXvC1g`);

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    try {
        let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?limit=${200}&offset=${offset}`, requestOptions)
        let toJson = await apiData.json()
        return toJson.results
    } catch (error) {
        navigate('/error')
    }

}

export default FetchData