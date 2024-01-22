async function TransferGenera(generaCodes, generaName,generaData ,setGeneraData, generaResult){

    if (generaResult[generaName]){
        console.log('if','RESULTS: ', generaResult, 'DATA: ', generaData)
    }
    else{
        console.log('else','RESULTS: ', generaResult, 'DATA: ', generaData)
        let name = generaName 
        let codes = generaCodes
        let data = {'name': name, 'codes': codes}
        let stringifiedData = await JSON.stringify(data)
        await sessionStorage.setItem('data',stringifiedData)
        await setGeneraData(data)
    }
}

export default TransferGenera