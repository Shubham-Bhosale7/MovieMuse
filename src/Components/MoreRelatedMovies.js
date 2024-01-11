import React from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import TransferData from '../GeneralJs/TransferData'
import { useEffect, useContext } from 'react'
import GenreAndMovieFetcher from '../GeneralJs/GenreAndMovieFetcher'
import { StorageContext } from '../Context/StorageContext'
import { useNavigate } from 'react-router-dom'


function Movie(props) {
    const ContextItems = useContext(StorageContext)
    const navigate = useNavigate()

    useEffect(() => {
        (async function () {
            try {
                props.setLoadDetector(false)
                props.setProgress(40)
                let fetchedData = await GenreAndMovieFetcher()
                ContextItems.updateData(fetchedData)
                props.setProgress(100)
                props.setLoadDetector(true)
            } catch (error) {
                navigate('/error')
            }
        })()
    }, [])

    return (
        <>
            {ContextItems.data.length > 0 ?
                <>
                    <div className="movie-container">
                        <div className="wrapper-movie">
                            <div className="carousel-movie">
                                {
                                    ContextItems.data.filter((element) => {
                                        return element.title_type === 'movie'
                                    }).map((element) => {
                                        return (
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
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </> : <div></div>
            }
        </>
    )
}

export default Movie