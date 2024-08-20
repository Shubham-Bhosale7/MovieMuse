async function TransferGenera(generaCodes, generaName, setGeneraData, generaResult) {

    // if (generaResult[generaName]) { }
    // else {
        let name = generaName
        let codes = generaCodes
        let data = { 'name': name, 'codes': codes }
        let stringifiedData = await JSON.stringify(data)
        await sessionStorage.setItem('data', stringifiedData)
        await setGeneraData(data)
    // }
}

export default TransferGenera