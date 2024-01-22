import FetchData from "./FetchData";
import Shuffler from "./Shuffler";
import arrangeByRating from "./ArrangeByRating";

async function fetchDataCaller(setLoadDetector, setProgress, setData, prevMovies ,setMovie,prevSeries, setSeries, prevTrending, setTrending,prevRecents, setRecents, offset, setOffset) {
        setLoadDetector(false)
        setProgress(40)
        console.log('fetch data calller initiated',offset)
        let moreData = await FetchData(offset)
        // setData(moreData)

        console.log('MORE DATA', moreData)

        //setting trendings
        let trending = moreData.filter((element) => {
                return element.poster.length > 3
        }).sort(arrangeByRating).slice(0, 6)

        // let previousTrending = ContextItems.trending
        
        console.log('addition', prevTrending.concat(trending))
        let a = prevTrending.concat(trending)
        console.log('a', a)
        setTrending(a)

        console.log('TRENDING: ', trending)

        //setting movies
        let movies = Shuffler(moreData).filter((element) => {
                return element.poster.length > 3 && element.title_type === 'movie'
        })
        // let previousMovies = ContextItems.movies
        setMovie(prevMovies.concat(movies))
        console.log('MOVIE: ', movies)

        //settting series
        let series = Shuffler(moreData).filter((element) => {
                return element.poster.length > 3 && element.title_type === 'series'
        })
        // let previousSeries = ContextItems.series
        setSeries(prevSeries.concat(series))
        console.log('SERIES: ', series)

        //setting recents
        // let recents = ContextItems.data.sort(function (a,b){
        //         return new Date(a.title_date) - new Date(b.title_date)
        //     }).filter((item) => {
        //         return item.poster.length  > 0
        //     }).slice(0, 50)

        let recents = moreData.filter((item) => {
                return item.poster.length > 0
        })
        .sort(function (a, b) {
                return new Date(a.title_date) - new Date(b.title_date)
        })
        .slice(0, 50)
        // let previousRecents = ContextItems.recents 
        setRecents(prevRecents.concat(recents))
        console.log('RECENTS: ', recents)
        setOffset(offset + 200) 

        // setLimit(limit + 200)
        setProgress(100)
        setLoadDetector(true)
}

export default fetchDataCaller