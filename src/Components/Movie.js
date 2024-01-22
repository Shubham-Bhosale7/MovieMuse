import React, { useContext, useEffect } from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import TransferData from '../GeneralJs/TransferData'
import { useNavigate } from 'react-router-dom'
import fetchDataCaller from '../GeneralJs/FetchDataCaller'
import { StorageContext } from '../Context/StorageContext'

function Movie(props) {
    const navigate = useNavigate()
    const ContextItems = useContext(StorageContext)

    function skeletonScreen(){
        let widthOfScreen = window.innerWidth
        let heightOfScreen = window.innerHeight



    }

    async function fetchMoreData() {
        // await props.setLimit(props.limit + 200)
        // ContextItems.setLimit(200)
        // fetchDataCaller(props.limit, props.setLimit, props.setLoadDetector, props.setProgress, props.setData, navigate)
        // fetchDataCaller(ContextItems.limit, ContextItems.setLimit, ContextItems.setIsDataLoaded, props.setProgress, ContextItems.setData)
        fetchDataCaller(ContextItems.setIsDataLoaded, props.setProgress, ContextItems.setData,ContextItems.movies, ContextItems.setMovies,ContextItems.series,  ContextItems.setSeries,ContextItems.trending, ContextItems.setTrending,ContextItems.recents, ContextItems.setRecents, ContextItems.offset, ContextItems.setOffset)
    }

    useEffect(() => { //try to set movies, series, and recents in a context state so we dont need to do same operation over and over, This can be done by fetching the resources and performing the necessary operations and setting the context
        if (!ContextItems.isDataLoaded) {
            fetchDataCaller(ContextItems.setIsDataLoaded, props.setProgress, ContextItems.setData,ContextItems.movies, ContextItems.setMovies,ContextItems.series,  ContextItems.setSeries,ContextItems.trending, ContextItems.setTrending,ContextItems.recents, ContextItems.setRecents, ContextItems.offset, ContextItems.setOffset)
            ContextItems.setIsDataLoaded(true)
        }
    }, [])

    return (
        <>
            {console.log('CONTEXT DATA: ', ContextItems.data)}
            {
                ContextItems.movies.length > 0 &&
                <>
                    <div className="movie-container">
                        <div className="wrapper-movie">
                            <div className="carousel-movie">
                                {
                                    ContextItems.movies.map((element) => {
                                        return (
                                            <>
                                                <Link onClick={() => { TransferData(element) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="movie-item info-to-store">
                                                    <div className="movie-poster">
                                                        {element.poster.length > 3 ? <img src={element.poster} alt="poster" /> : <img src={Server} alt="poster" />}
                                                    </div>
                                                    <div className="movie-info">
                                                        <div className="movie-name-rating-container">
                                                            <div className="movie-name">
                                                                {element.title.length > 0 ? element.title : '--'}
                                                            </div>
                                                            <div className="movie-rating">
                                                                {element.rating.length > 0 ? element.rating : "--"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="movie-show-more-btn-container">
                        <button onClick={fetchMoreData} className="movie-show-more-btn">
                            <span>Show More</span>
                            <i class="fa-solid fa-angle-down"></i></button>
                    </div>
                </>
            }
        </>
    )
}

export default Movie