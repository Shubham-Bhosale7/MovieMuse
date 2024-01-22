//Takes generes and fetch movies and shows according to that.
import FetchGeneresMovie from "./FetchGeneresMovie";
import FetchGeneres from "./FetchGenres";

async function GenreAndMovieFetcher(navigate, offset, setoffset, setMax) {
  try{
    let netflix_id = await JSON.parse(sessionStorage.getItem('movieInfo')).netflix_id;
    let results = await FetchGeneres(netflix_id)
    console.log('GENERAS FOR RESULTS',results)
    let generesRefactor = results.map((element) => {
      return element.genre_id
    })
    console.log('FLAG1')
    let generesMovie = await FetchGeneresMovie(generesRefactor, offset, setoffset, setMax) 
    console.log('FLAGX')
    console.log('FLAG2', generesMovie)
    return generesMovie
  }
  catch(error){
    navigate('/error')
  }

}
export default GenreAndMovieFetcher