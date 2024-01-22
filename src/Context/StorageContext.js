import React, { useState, createContext } from 'react';


export const StorageContext = createContext();

const StorageContextData = (props) => {
    // const [data, setData] = useState([])
    const [query, setQuery] = useState('')
    const [searchQueryResults, setSearchQueryResults] = useState([])

    const [progress, setProgress] = useState(10)
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(200)
    const [offset, setOffset] = useState(0)
    const [loadDetector, setLoadDetector] = useState(false)

    const [trending, setTrending] = useState([])
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [recents, setRecents] = useState([])

    const [relatedMovies, setRelatedMovies] = useState([])
    const [relatedSeries, setRelatedSeries] = useState([])

    const [generaElement, setGeneraElement] = useState([])

    // const [genera, setGenera] = useState({})
    // const [generaName, setGeneraName] = useState('')

    const [generaResult, setGeneraResult] = useState({}) // stores the fetched data of various generas
    const [generaLimit, setGeneraLimit] = useState(200)


    const [generaData, setGeneraData] = useState({}) // stores genera codes and name 

    const [relatedShowsOffset, setRelatedShowsOffset] = useState(0)
    const [relatedShowsMaxLimit, setRelatedShowsMaxLimit] = useState(0)

    //Update data on element info page
    // function updateData(data) {
    //     setData(data)
    // }

    //Shuffle fetched Data
    // function Shuffler(arr) {
    //     return arr.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
    // }

    //Arrange Shows on home screen according to descending order of ratings
    // function arrangeShow(a, b) {
    //     return parseFloat(b.rating) - parseFloat(a.rating);
    // }

    //Update data of search query
    // function updateSearchQuery(fetchedQueryResults) {
    //     setSearchQueryResults(fetchedQueryResults)
    // }

    //Update query when form is submitted before navigating to result page
    // function updateQuery(queryValue) {
    //     setQuery(queryValue)
    // }

    //Carousel for shows on display trending page (home page)
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

    //Check if data is already there
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    return (
        <StorageContext.Provider value={{ data,setData, searchQueryResults, query, displayShowSettings, movieAndSeriesSettings, handleHamCross, handleSearchIcon, isDataLoaded, setIsDataLoaded,progress, setProgress,limit, setLimit,loadDetector, setLoadDetector, offset, setOffset, setQuery, trending, setTrending, movies, setMovies, series, setSeries, recents, setRecents,relatedMovies, setRelatedMovies, relatedSeries, setRelatedSeries,generaElement, setGeneraElement, generaResult, setGeneraResult, generaLimit, setGeneraLimit, generaData, setGeneraData, relatedShowsOffset, setRelatedShowsOffset, relatedShowsMaxLimit, setRelatedShowsMaxLimit }}>
            {props.children}
        </StorageContext.Provider>
    );
}
export default StorageContextData;