import React, { useContext } from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import TransferData from '../GeneralJs/TransferData'
import { useNavigate } from 'react-router-dom'
import fetchDataCaller from '../GeneralJs/FetchDataCaller'
import { StorageContext } from '../Context/StorageContext'
import loadingScreen from "../GeneralJs/LoadingMoviesAndSeries"

function Movie(props) {
    const navigate = useNavigate()
    const ContextItems = useContext(StorageContext)

    async function fetchMoreData() {
        fetchDataCaller(
            ContextItems.setLoadDetector,
            props.setProgress,
            ContextItems.movies,
            ContextItems.setMovies,
             ContextItems.series, 
            ContextItems.setSeries,
             ContextItems.trending,
             ContextItems.setTrending,
             ContextItems.recents,
             ContextItems.setRecents,
             ContextItems.offset,
            ContextItems.setOffset, 
            navigate
        )

    }

    return (
        <>
            {
                ContextItems.movies.length > 0 ?
                    <>
                        <div className="movie-container">
                            <div className="wrapper-movie">
                                <div className="carousel-movie">
                                    {
                                        ContextItems.movies.map((element) => {
                                            return (
                                                <>
                                                    <Link onClick={() => { TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries)}} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="movie-item info-to-store">
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
                    :
                    <>
                        {
                            loadingScreen()
                        }
                    </>
            }
        </>
    )
}

export default Movie