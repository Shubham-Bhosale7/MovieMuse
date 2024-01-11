import React from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import TransferData from '../GeneralJs/TransferData'
import { useNavigate } from 'react-router-dom'
import fetchDataCaller from '../GeneralJs/FetchDataCaller'

function Movie(props) {
    const navigate = useNavigate()
    async function fetchMoreData() {
        await props.setLimit(props.limit + 200)
        fetchDataCaller(props.limit, props.setLimit, props.setLoadDetector, props.setProgress, props.setData, navigate)
    }

    return (
        <>
            {
                props.data.length > 0 &&
                <>
                    <div className="movie-container">
                        <div className="wrapper-movie">
                            <div className="carousel-movie">
                                {
                                    props.data.filter((element) => {
                                        return element.title_type === 'movie'
                                    }).map((element) => {
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