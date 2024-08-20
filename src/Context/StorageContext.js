import React, { useState, createContext, useEffect } from 'react';
import arrangeByRating from '../GeneralJs/ArrangeByRating';
import Shuffler from '../GeneralJs/Shuffler';
import { useNavigate } from 'react-router-dom';

export const StorageContext = createContext();

const StorageContextData = (props) => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [searchQueryResults, setSearchQueryResults] = useState([])

    const [progress, setProgress] = useState(10)
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(200)
    const [offset, setOffset] = useState(0)
    const [loadDetector, setLoadDetector] = useState(false)
    const [loading, setLoading] = useState(false)

    const [trending, setTrending] = useState([])
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [recents, setRecents] = useState([])

    const [relatedMovies, setRelatedMovies] = useState([])
    const [relatedSeries, setRelatedSeries] = useState([])

    const [generaElement, setGeneraElement] = useState([])

    const [generaResult, setGeneraResult] = useState({}) // stores the fetched data of various generas
    const [generaLimit, setGeneraLimit] = useState(200)


    const [generaData, setGeneraData] = useState({}) // stores genera codes and name 

    const [relatedMovesOffset, setRelatedMoviesOffset] = useState(0)
    const [relatedSeriesOffset, setRelatedSeriesOffset] = useState(0)

    const [relatedMoviesMaxLimit, setRelatedMoviesMaxLimit] = useState(0)
    const [relatedSeriesMaxLimit, setRelatedSeriesMaxLimit] = useState(0)

    const [movieAndSeriesOffset, setMovieAndSeriesOffset] = useState(0)
    const [elementDataLoaded, setElementDataLoaded] = useState(false)

    const [isDataLoaded, setIsDataLoaded] = useState(false)



    async function FetchData() {

        let myHeaders = new Headers();
        myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

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


    async function fetchDataCaller() {

        try {
            setLoading(true)
            setLoadDetector(false)
            let moreData = await FetchData()

            //setting trendings
            let trendingShows = moreData.filter((element) => {
                return element.poster.length > 3
            }).sort(arrangeByRating).slice(0, 10)

            setTrending(trending => trending.concat(trendingShows))

            //setting movies
            let newMovies = Shuffler(moreData).filter((element) => {
                return element.poster.length > 3 && element.title_type === 'movie'
            })
            setMovies(movies => movies.concat(newMovies))

            //setting series
            let newSeries = Shuffler(moreData).filter((element) => {
                return element.poster.length > 3 && element.title_type === 'series'
            })
            setSeries(series => series.concat(newSeries))

            let newRecents = moreData.filter((item) => {
                return item.poster.length > 0
            })
                .sort(function (a, b) {
                    return new Date(a.title_date) - new Date(b.title_date)
                })
                .slice(0, 50)
            setRecents(recents => recents.concat(newRecents))
            setOffset(offset + 200)
            setLoading(false)
            setLoadDetector(true)
        } catch (error) {
            console.log('ERROR CAUTH')
            navigate('/error')
        }
    }

    const displayShowSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    //Carousel for movie and series on display trending and element info page
    const movieAndSeriesSettings = {
        initialSlide: 0,
        className: "slider variable-width",
        dots: false,
        infinite: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
    };

    //Toggles between ham menu and cross
    function handleHamCross() {
        document.querySelector(".nav-bar").classList.toggle('nav-bg-toggler')
        document.querySelector(".ham-menu-container .fa-bars").classList.toggle('ham-cross-toggler')
        document.querySelector(".ham-menu-container .fa-xmark").classList.toggle('ham-cross-toggler')
        document.querySelector(".ham-menu-container .fa-magnifying-glass").classList.toggle('search-icon-toggler')
        document.querySelector(".nav-bar-list").classList.toggle('nav-bar-list-hide')
        document.querySelector(".nav-bar-list").classList.toggle('nav-bar-list-show')
    }

    //Show search icon on click
    function handleSearchIcon() {
        document.querySelector(".search-bar-small-screen").classList.toggle('search-bar-small-screen-visible')
    }

    useEffect(() => {
        if ((movies.length == 0 && series.length == 0 && trending.length == 0 && recents.length == 0)) {
            fetchDataCaller()
        }
    }, [])

    return (
        <StorageContext.Provider value={{
            data, setData, searchQueryResults, query, displayShowSettings, movieAndSeriesSettings, handleHamCross, handleSearchIcon, isDataLoaded, setIsDataLoaded, progress, setProgress, limit, setLimit, loadDetector, setLoadDetector, offset, setOffset, setQuery, trending, setTrending, movies, setMovies, series, setSeries, recents, setRecents, relatedMovies, setRelatedMovies, relatedSeries, setRelatedSeries, generaElement, setGeneraElement, generaResult, setGeneraResult, generaLimit, setGeneraLimit, generaData, setGeneraData, relatedMovesOffset, setRelatedMoviesOffset, relatedSeriesOffset, setRelatedSeriesOffset, relatedMoviesMaxLimit, setRelatedMoviesMaxLimit, relatedSeriesMaxLimit, setRelatedSeriesMaxLimit, movieAndSeriesOffset, setMovieAndSeriesOffset, elementDataLoaded, setElementDataLoaded, searchQueryResults, setSearchQueryResults,
            loading, setLoading,
        }}>
            {props.children}
        </StorageContext.Provider>
    );
}
export default StorageContextData;