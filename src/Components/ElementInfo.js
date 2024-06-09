import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Server from "../Assets/server.png"
import GenreAndMovieFetcher from '../GeneralJs/GenreAndMovieFetcher'
import TransferData from '../GeneralJs/TransferData';
import { StorageContext } from '../Context/StorageContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import { useNavigate } from "react-router-dom";

function ElementInfo() {
    let navigate = useNavigate();
    const ContextItems = useContext(StorageContext)

    async function CallGenreAndDataOnClick(element) {
        try {
            ContextItems.setLoading(true)
            TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries)
            ContextItems.data.length = 0

            ContextItems.setMovieAndSeriesOffset(0)

            ContextItems.setRelatedMovies([])

            ContextItems.setRelatedSeries([])


            let fetchedData = await GenreAndMovieFetcher(navigate, ContextItems.movieAndSeriesOffset, ContextItems.setMovieAndSeriesOffset, ContextItems.relatedMovesOffset, ContextItems.setRelatedMoviesOffset, ContextItems.relatedSeriesOffset, ContextItems.setRelatedSeriesOffset, ContextItems.setRelatedMoviesMaxLimit, ContextItems.setRelatedSeriesMaxLimit)

            let movies = fetchedData.filter((element) => {
                return element.title_type === 'movie'
            })
            let series = fetchedData.filter((element) => {
                return element.title_type === 'series'
            })
            ContextItems.setRelatedMovies(movies)
            ContextItems.setRelatedSeries(series)
            ContextItems.setLoading(false)
        } catch (e) {
            navigate('/error')
        }
    }

    useEffect(() => {
        (async function () {

            try {
                if (ContextItems.relatedMovies.length > 0 || ContextItems.relatedSeries.length > 0) {
                    // No need to fetch again data is already there.
                    
                }
                else {
                    ContextItems.setLoading(true)
                    ContextItems.setRelatedMovies([])
                    ContextItems.setRelatedSeries([])

                    let fetchedData = await GenreAndMovieFetcher(navigate, ContextItems.movieAndSeriesOffset, ContextItems.setMovieAndSeriesOffset, ContextItems.relatedMovesOffset, ContextItems.setRelatedMoviesOffset, ContextItems.relatedSeriesOffset, ContextItems.setRelatedSeriesOffset, ContextItems.setRelatedMoviesMaxLimit, ContextItems.setRelatedSeriesMaxLimit, ContextItems.setElementDataLoaded)

                    let movies = fetchedData.filter((element) => {
                        return element.title_type === 'movie'
                    })

                    let series = fetchedData.filter((element) => {
                        return element.title_type === 'series'
                    })

                    ContextItems.setRelatedMovies(movies)
                    ContextItems.setRelatedSeries(series)
                    ContextItems.setLoading(false)
                }
            } catch (e) {
                navigate('/error')
            }
        })()
    }, [])

    function loadingSeries() {
        let exoSeries = [];
        for (let i = 0; i < 10; i++) {
            exoSeries.push(
                <div style={{ width: 250 }} key={i} className="display-series-item info-to-store exo-series-element">
                    <div className="display-series-poster exo-series-element-poster"></div>
                </div>
            )
        }
        return (
            <div className="display-series-container">
                <div className="display-series-heading">
                    <div className="display-series-heading-title">
                        Related Series
                    </div>
                </div>
                <Slider {...ContextItems.movieAndSeriesSettings}>
                    {exoSeries}
                </Slider>
            </div>
        )
    }
    function loadingMovies() {
        let exoSeries = [];
        for (let i = 0; i < 10; i++) {
            exoSeries.push(
                <div style={{ width: 250 }} key={i} className="display-series-item info-to-store exo-series-element">
                    <div className="display-series-poster exo-series-element-poster"></div>
                </div>
            )
        }
        return (
            <div className="display-series-container">
                <div className="display-series-heading">
                    <div className="display-series-heading-title">
                        Related Movie
                    </div>
                </div>
                <Slider {...ContextItems.movieAndSeriesSettings}>
                    {exoSeries}
                </Slider>
            </div>
        )
    }

    return (
        <>
            <div className="element-info-container">
                <div className="element-info">
                    <div className="movie-info carousel-element-info">
                        <div key={JSON.parse(sessionStorage.getItem('movieInfo')).netflix_id} className="selected-element-info">
                            <div className="element-info-poster-info-container">
                                <div className="element-info-info">
                                    <div className="detailed-title">
                                        <span className="title-span">
                                            <h1>{JSON.parse(sessionStorage.getItem('movieInfo')).title.length > 1 ? JSON.parse(sessionStorage.getItem('movieInfo')).title : "--"}</h1>
                                        </span>
                                    </div>
                                    <div className="detailed-synopsis">
                                        <span className="synopsis-span">
                                        </span>
                                        {JSON.parse(sessionStorage.getItem('movieInfo')).synopsis.length > 1 ? JSON.parse(sessionStorage.getItem('movieInfo')).synopsis : "--"}
                                    </div>
                                    <div className="title-type-container">
                                        <span className="title-type-span">
                                            <span className="point-head">Type : </span>
                                            <span>
                                                {JSON.parse(sessionStorage.getItem('movieInfo')).title_type.length > 1 ? JSON.parse(sessionStorage.getItem('movieInfo')).title_type : "--"}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="run-time-container">
                                        <span className="run-time-span">
                                            <span className="point-head">Run time : </span>
                                            {JSON.parse(sessionStorage.getItem('movieInfo')).runtime.length > 1 ? `${(Number(JSON.parse(sessionStorage.getItem('movieInfo')).runtime) / 60).toFixed(2)} Min` : "-- Min"}
                                        </span>
                                    </div>
                                    <div className="imdb-id">
                                        <span className="imdb-id-span">
                                            <span className="point-head">IMDB ID : </span>
                                            {JSON.parse(sessionStorage.getItem('movieInfo')).imdb_id.length > 1 ? JSON.parse(sessionStorage.getItem('movieInfo')).imdb_id : "--"}
                                        </span>
                                    </div>
                                    <div className="netflix-id">
                                        <span className="netflix-id-span">
                                            <span className="point-head">Netflix ID : </span>
                                            {JSON.parse(sessionStorage.getItem('movieInfo')).netflix_id}
                                        </span>
                                    </div>
                                    <div className="rating-container">
                                        <span className="rating-span">
                                            <span className="point-head">Rating : </span>{JSON.parse(sessionStorage.getItem('movieInfo')).rating.length > 1 ? JSON.parse(sessionStorage.getItem('movieInfo')).rating : "--"}
                                        </span>
                                    </div>
                                    <div className="top-250-container">
                                        <span className="top-250-span">
                                            <span className="point-head">Top 250 : </span>{JSON.parse(sessionStorage.getItem('movieInfo')).top250}
                                        </span>
                                    </div>
                                    <div className="top-250tv-container">
                                        <span className="top-250tv-span">
                                            <span className="point-head">Top 250tv : </span>{JSON.parse(sessionStorage.getItem('movieInfo')).top250tv}
                                        </span>
                                    </div>
                                    <div className="year-container">
                                        <span className="year-span">
                                            <span className="point-head">Date : </span>
                                            {JSON.parse(sessionStorage.getItem('movieInfo')).title_date.length > 1 ? JSON.parse(sessionStorage.getItem('movieInfo')).title_date : "--"}
                                        </span>
                                    </div>
                                </div>
                                <div className="element-info-poster-container">
                                    <img src={JSON.parse(sessionStorage.getItem('movieInfo')).poster.length > 3 ? JSON.parse(sessionStorage.getItem('movieInfo')).poster : Server} alt="poster" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                !ContextItems.loading ?
                    <>
                        {
                            ContextItems.relatedMovies.length > 0 ?
                                <div className="display-movie-container">
                                    <div className="display-movie-heading">
                                        <div className="display-movie-heading-title">
                                            Related Movies
                                        </div>
                                        <div className="display-movie-heading-show-more">
                                            <Link to="/related movies">
                                                &rarr;
                                            </Link>
                                        </div>
                                    </div>

                                    <Slider {...ContextItems.movieAndSeriesSettings}>
                                        {
                                            ContextItems.relatedMovies.slice(0, 50).map((element) => {
                                                return (
                                                    <Link style={{ width: 250 }} onClick={() => { CallGenreAndDataOnClick(element) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="display-movie-item info-to-store element-info-related-movies-series">
                                                        <div className="display-movie-poster">
                                                            {element.poster.length > 3 ? <img src={element.poster} alt="poster" /> : <img src={Server} alt="poster" />}
                                                        </div>
                                                        <div className="display-movie-info">
                                                            <div className="display-movie-name-rating-container">
                                                                <div className="display-movie-name">
                                                                    {element.title}
                                                                </div>
                                                                <div className="display-movie-rating">
                                                                    {element.rating}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </Slider>
                                </div>
                                :
                                <></>
                        }
                    </>
                    :
                    <>
                        {
                            loadingMovies()
                        }
                    </>

            }

            {
                !ContextItems.loading ?
                    <>
                        {
                            ContextItems.relatedSeries.length > 0 ?
                                <div className="display-series-container">
                                    <div className="display-series-heading">
                                        <div className="display-series-heading-title">
                                            Related Series
                                        </div>
                                        <div className="display-series-heading-show-more">
                                            <Link to="/related series">
                                                &rarr;
                                            </Link>
                                        </div>
                                    </div>

                                    <Slider {...ContextItems.movieAndSeriesSettings}>
                                        {
                                            ContextItems.relatedSeries.slice(0, 50).map((element) => {
                                                return (
                                                    <Link style={{ width: 250 }} onClick={() => { CallGenreAndDataOnClick(element) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="display-series-item info-to-store">
                                                        <div className="display-series-poster">
                                                            {element.poster.length > 3 ? <img src={element.poster} alt="poster" /> : <img src={Server} alt="poster" />}
                                                        </div>
                                                        <div className="display-series-info">
                                                            <div className="display-series-name-rating-container">
                                                                <div className="display-series-name">
                                                                    {element.title}
                                                                </div>
                                                                <div className="display-series-rating">
                                                                    {element.rating}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </Slider>
                                </div>
                                :
                                <>
                                </>

                        }
                    </>
                    :
                    <>
                        {
                            loadingSeries()
                        }
                    </>
            }

        </>

    )
}

export default ElementInfo