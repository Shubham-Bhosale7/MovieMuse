async function FetchGeneraElement(setProgress, setLoadDetector, navigate, generaData, generaResult) {
    try {
        let storageData = sessionStorage.getItem('data')
        let parsedData = JSON.parse(storageData)
        let generaCodes = parsedData['codes']
        let generaName = parsedData['name']

        if (generaResult[generaName]) {
            // The genera is already there in the context (already fetched its info that's why its name is here) so no need to fetch again.
        }
        else {

            setProgress(40)
            setLoadDetector(false)

            var myHeaders = new Headers();
            myHeaders.append("apikey", `c98JcNXxEUlHpsP5c53Wf3vtY3EXvC1g`);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };
            let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${generaCodes}&limit=${100}`, requestOptions)
            let toJson = await apiData.json()
            let final = toJson.results

            let data = { 'elements': final, 'limit': 100, 'max': toJson.Object['total'] }
            generaResult[generaName] = data

            setProgress(100)
            setLoadDetector(true)

        }
    } catch (e) {
        navigate('/error')
    }
}

export default FetchGeneraElement