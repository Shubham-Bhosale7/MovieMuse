import FetchData from "./FetchData";
import Shuffler from "./Shuffler";
import arrangeByRating from "./ArrangeByRating";

async function fetchDataCaller(setLoadDetector, setProgress, prevMovies, setMovie, prevSeries, setSeries, prevTrending, setTrending, prevRecents, setRecents, offset, setOffset, navigate) {
        try {

                setLoadDetector(false)
                setProgress(40)
                let moreData = await FetchData(offset, navigate)

                //setting trendings
                let trending = moreData.filter((element) => {
                        return element.poster.length > 3
                }).sort(arrangeByRating).slice(0, 6)

                let a = prevTrending.concat(trending)
                setTrending(a)

                //setting movies
                let movies = Shuffler(moreData).filter((element) => {
                        return element.poster.length > 3 && element.title_type === 'movie'
                })
                setMovie(prevMovies.concat(movies))

                //setting series
                let series = Shuffler(moreData).filter((element) => {
                        return element.poster.length > 3 && element.title_type === 'series'
                })
                setSeries(prevSeries.concat(series))

                let recents = moreData.filter((item) => {
                        return item.poster.length > 0
                })
                        .sort(function (a, b) {
                                return new Date(a.title_date) - new Date(b.title_date)
                        })
                        .slice(0, 50)
                setRecents(prevRecents.concat(recents))
                setOffset(offset + 200)
                setProgress(100)
                setLoadDetector(true)
        } catch (error) {
                navigate('/error')
        }
}

export default fetchDataCaller