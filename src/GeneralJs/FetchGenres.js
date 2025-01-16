//Takes netflix id and fetch its generes
async function fetchGeneres(netflix_id) {

     var myHeaders = new Headers();
     myHeaders.append("apikey", `c98JcNXxEUlHpsP5c53Wf3vtY3EXvC1g`);
 
     var requestOptions = {
         method: 'GET',
         redirect: 'follow',
         headers: myHeaders
     };
     let apiData = await fetch(`https://api.apilayer.com/unogs/title/genres?netflix_id=${netflix_id}`, requestOptions)

     let toJson = await apiData.json()
     return toJson.results
}

export default fetchGeneres