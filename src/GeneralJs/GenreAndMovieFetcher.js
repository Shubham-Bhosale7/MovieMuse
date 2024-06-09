//Takes generes and fetch movies and shows according to that.
import FetchGeneresMovie from "./FetchGeneresMovie";
import FetchGeneres from "./FetchGenres";

async function GenreAndMovieFetcher(navigate, movieAndSeriesOffset, setMovieAndSeriesOffset, relatedMovesOffset, setRelatedMoviesOffset, relatedSeriesOffset, setRelatedSeriesOffset, setRelatedMoviesMaxLimit, setRelatedSeriesMaxLimit, setElementDataLoaded) {
  try {
    let netflix_id = await JSON.parse(sessionStorage.getItem('movieInfo')).netflix_id;
    let results = await FetchGeneres(netflix_id)
    let generesRefactor = results.map((element) => {
      return element.genre_id
    })
    let generesMovie = await FetchGeneresMovie(generesRefactor, movieAndSeriesOffset, setMovieAndSeriesOffset, relatedMovesOffset, setRelatedMoviesOffset, relatedSeriesOffset, setRelatedSeriesOffset, setRelatedMoviesMaxLimit, setRelatedSeriesMaxLimit, setElementDataLoaded)
    return generesMovie
  }
  catch (error) {
    navigate('/error')
  }

}
export default GenreAndMovieFetcher