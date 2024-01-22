async function FetchGeneraElement(setProgress, setLoadDetector, navigate, generaData, generaResult) {
    try {
        let storageData = sessionStorage.getItem('data')
        let parsedData = JSON.parse(storageData)
        console.log('FLAG1',parsedData)
        let generaCodes = parsedData['codes']
        let generaName = parsedData['name']

        if (generaResult[generaName]) {
            console.log('if','RESULTS: ', generaResult, 'DATA: ', generaData)

        }
        else {
            setProgress(40)
            setLoadDetector(false)

            var myHeaders = new Headers();
            myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };
            let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${generaCodes}&limit=${100}&offset=${0}`, requestOptions)
            let toJson = await apiData.json()
            let final = toJson.results
            // console.log('API DATA', apiData)
            // console.log('TO JSON', toJson)
            // console.log('FINAL', final)


            let data = { 'elements': final, 'offset': 0, 'limit': 100, 'max': toJson.Object['total'] } 
            // let data = {'element': final, 'limit': 100}
            generaResult[generaName] = data

            setProgress(100)
            setLoadDetector(true)
            // console.log('else','RESULTS: ', generaResult, 'DATA: ', generaData

        }
    } catch (e) {
        console.log('e', e)
        navigate('/error')
    }
}

export default FetchGeneraElement