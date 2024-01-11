import React from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import TransferData from '../GeneralJs/TransferData'
import { useNavigate } from 'react-router-dom'
import fetchDataCaller from '../GeneralJs/FetchDataCaller'

function Series(props) {
    const navigate = useNavigate()

    async function fetchMoreData() {
        try {
            await props.setLimit(props.limit + 200)
            fetchDataCaller(props.limit, props.setLimit, props.setLoadDetector,props.setProgress, props.setData, navigate)
        } catch (error) {
            navigate('/error')
        }
    }

    return (
        <>
            {
                props.data.length > 0 &&
                <>
                    <div className="series-container">
                        <div className="wrapper-series">
                            <div className="carousel-series">
                                {
                                    props.data.filter((element) => {
                                        return element.title_type === 'series'
                                    }).map((element) => {
                                        return (
                                            <Link onClick={() => { TransferData(element) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="series-item info-to-store">
                                                <div className="series-poster">
                                                    {element.poster.length > 3 ? <img src={element.poster} alt="poster" /> : <img src={Server} alt="poster" />}
                                                </div>
                                                <div className="series-info">
                                                    <div className="series-name-rating-container">
                                                        <div className="series-name">
                                                            {element.title.length > 0 ? element.title : '--'}
                                                        </div>
                                                        <div className="series-rating">
                                                            {element.rating.length > 0 ? element.rating : "--"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="movie-show-more-btn-container">
                        <button onClick={fetchMoreData} className="movie-show-more-btn">
                            <span>Show More</span>
                            <i className="fa-solid fa-angle-down"></i>
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default Series