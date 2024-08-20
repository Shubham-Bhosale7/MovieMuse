import React from 'react'
import { useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import TransferData from '../GeneralJs/TransferData'
import { StorageContext } from '../Context/StorageContext'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import actionPoster from "../Assets/action-poster.jpg"
import sciFiPoster from "../Assets/sci-fi.png"
import animationPoster from "../Assets/animation-poster.jpeg"
import animePoster from "../Assets/anime-poster.jpg"
import comedyPoster from "../Assets/comedy-poster.jpg"
import documentriesPoster from "../Assets/documentries-poster.jpg"
import horrorFilmsPoster from "../Assets/horror-films-poster.jpg"
import darkComedyPoster from "../Assets/dark-comedy-poster.jpg"
import TransferGenera from '../GeneralJs/TransferGeneras'


function LandingPoster() {
    const ContextItems = useContext(StorageContext);
    const navigate = useNavigate()


    function loadingSeries() {
        let exoSeries = [];
        for (let i = 0; i < 10; i++) {
            exoSeries.push(
                <div style={{ width: 250 }} className="display-series-item info-to-store exo-series-element">
                    <div className="display-series-poster exo-series-element-poster"></div>
                </div>
            )
        }
        return (
            <div className="display-series-container">
                <div className="display-series-heading">
                    <div className="display-series-heading-title">
                        Series
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
                <div style={{ width: 250 }} className="display-series-item info-to-store exo-series-element">
                    <div className="display-series-poster exo-series-element-poster"></div>
                </div>
            )
        }
        return (
            <div className="display-series-container">
                <div className="display-series-heading">
                    <div className="display-series-heading-title">
                        Movie
                    </div>
                </div>
                <Slider {...ContextItems.movieAndSeriesSettings}>
                    {exoSeries}
                </Slider>
            </div>
        )
    }

    function loadingGeneras(heading) {
        let exoSeries = [];
        for (let i = 0; i < 8; i++) {
            exoSeries.push(
                <Link className="genera-box exo-genera-box action"></Link>
            )
        }
        return (
            <div className="genera-container">
                <div className="genera-heading display-movie-heading">
                    {heading}
                </div>
                <div className="genera-box-container">
                    {exoSeries}
                </div>
            </div>
        )
    }

    return (
        <>
            {
                ContextItems.trending.length > 0 ?
                    <>
                        <div className="display-show-container" id="tp">
                            <div className="display-show-heading">
                                <div className="display-show-heading-title">
                                    Trending
                                </div>
                            </div>
                            <div className="wrapper-landing-poster">
                                <div className="movie-info carousel-landing-poster">
                                    <Slider {...ContextItems.displayShowSettings}>
                                        {
                                            ContextItems.trending.map((element) => {
                                                return (
                                                    <>
                                                        <Link onClick={() => { TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="initial-poster-item info-to-store">
                                                            <div className="initial-poster-item-info-poster-container">
                                                                <div className="initial-poster-item-info">
                                                                    <div className="title-container">
                                                                        <span className="title-span">
                                                                            <h1>{element.title.length > 1 ? element.title : "--"}</h1>
                                                                        </span>
                                                                    </div>
                                                                    <div className="synopsis-container">
                                                                        <span className="synopsis-span">
                                                                        </span>
                                                                        {element.synopsis.length > 1 ? element.synopsis : "--"}
                                                                    </div>
                                                                    <div className="title-type-container">
                                                                        <span className="title-type-span">
                                                                            <span className="point-head">Type : </span>
                                                                            <span>
                                                                                {element.title_type.length > 1 ? element.title_type : "--"}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="run-time-container">
                                                                        <span className="run-time-span">
                                                                            <span className="point-head">Run time : </span>
                                                                            {element.runtime.length > 1 ? `${(Number(element.runtime) / 60).toFixed(2)} Min` : "-- Min"}
                                                                        </span>
                                                                    </div>
                                                                    <div className="imdb-id">
                                                                        <span className="imdb-id-span">
                                                                            <span className="point-head">IMDB ID : </span>
                                                                            {element.imdb_id.length > 1 ? element.imdb_id : "--"}
                                                                        </span>
                                                                    </div>
                                                                    <div className="netflix-id">
                                                                        <span className="netflix-id-span">
                                                                            <span className="point-head">Netflix ID : </span>
                                                                            {element.netflix_id}
                                                                        </span>
                                                                    </div>
                                                                    <div className="rating-container">
                                                                        <span className="rating-span">
                                                                            <span className="point-head">Rating : </span>{element.rating.length > 1 ? element.rating : "--"}
                                                                        </span>
                                                                    </div>
                                                                    <div className="top-250-container">
                                                                        <span className="top-250-span">
                                                                            <span className="point-head">Top 250 : </span>{element.top250}
                                                                        </span>
                                                                    </div>
                                                                    <div className="top-250tv-container">
                                                                        <span className="top-250tv-span">
                                                                            <span className="point-head">Top 250tv : </span>{element.top250tv}
                                                                        </span>
                                                                    </div>
                                                                    <div className="year-container">
                                                                        <span className="year-span">
                                                                            <span className="point-head">Date : </span>
                                                                            {element.title_date.length > 1 ? element.title_date : "--"}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="initial-poster-item-poster-container">
                                                                    <img src={element.poster} alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="initial-poster-item-small-screen">
                                                                <div className="initial-poster-item-title-container-small-screen">
                                                                    {element.title.length > 1 ? element.title : "--"}
                                                                </div>
                                                                <div className="initial-poster-item-rating-container-small-screen">
                                                                    {element.rating.length > 1 ? element.rating : "--"}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </>
                                                )
                                            })
                                        }

                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className="genera-container">
                            <div className="genera-heading display-movie-heading">
                                Genera
                            </div>
                            <div className="genera-box-container">
                                <Link onClick={() => { TransferGenera([801362, 43048, 1365, 9584], 'Action', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/action"} className="genera-box action">
                                    Action
                                    <img src={actionPoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([11014, 3276033, 6926, 108533, 1626246, 2729, 1568, 3327], 'Alien Sci-Fi', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/alien-sci-fi"} className="genera-box alien-sci-fi">
                                    Alien Sci-Fi
                                    <img src={sciFiPoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([11881, 4698, 58879, 51058], 'Animation', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/animation"} className="genera-box animation">
                                    Animation
                                    <img src={animationPoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([2653, 7424, 1819777, 1819776, 2316199, 2867325, 9302, 452, 2729, 6721, 1522235, 81216565, 1522234, 1623841], 'Anime', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/anime"} className="genera-box anime">
                                    Anime
                                    <img src={animePoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([7539, 10778, 1003219, 78163, 10375, 52847, 77599, 11039, 77230, 81216629, 11559, 7539], 'Comedy', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/comedy"} className="genera-box comedy">
                                    Comedy
                                    <img src={comedyPoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([3652, 9875, 8673, 6839, 2243108, 4720, 5349, 4006, 90361, 48768, 7018, 10005, 49110, 2760, 180, 81050, 72384], 'Documentaries', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/documentaries"} className="genera-box documentaries">
                                    Documentaries
                                    <img src={documentriesPoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([10695, 8195, 90848, 48303, 10944, 45028, 9509, 89585, 8711, 83059, 10750, 4809, 1694, 1663282, 75804, 75930, 75405], 'Horror Films', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/horror-films"} className="genera-box horror-films">
                                    Horror Films
                                    <img src={horrorFilmsPoster} />
                                </Link>
                                <Link onClick={() => { TransferGenera([869], 'Dark Comedies', ContextItems.setGeneraData, ContextItems.generaResult) }} to={"/genera/dark-comedies"} className="genera-box dark-comedies">
                                    Dark Comedies
                                    <img src={darkComedyPoster} />
                                </Link>
                            </div>
                        </div>

                        <div className="display-movie-container">
                            <div className="display-movie-heading">
                                <div className="display-movie-heading-title">
                                    Movies
                                </div>
                                <div className="display-movie-heading-show-more">
                                    <Link to="/movies">
                                        &rarr;
                                    </Link>
                                </div>
                            </div>
                            <Slider {...ContextItems.movieAndSeriesSettings}>
                                {
                                    ContextItems.movies.slice(0, 50).map((element) => {
                                        return (
                                            <Link style={{ width: 250 }} onClick={() => { TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="display-movie-item info-to-store">
                                                <div className="display-movie-poster">
                                                    <img src={element.poster} alt="poster" />
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

                        <div className="display-series-container">
                            <div className="display-series-heading">
                                <div className="display-series-heading-title">
                                    Series
                                </div>
                                <div className="display-series-heading-show-more">
                                    <Link to="/series">
                                        &rarr;
                                    </Link>
                                </div>
                            </div>
                            <Slider {...ContextItems.movieAndSeriesSettings}>
                                {
                                    ContextItems.series.slice(0, 50).map((element) => {
                                        return (
                                            <Link style={{ width: 250 }} onClick={() => { TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="display-series-item info-to-store">
                                                <div className="display-series-poster">
                                                    <img src={element.poster} alt="poster" />
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

                        <div className="display-series-container">
                            <div className="display-series-heading">
                                <div className="display-series-heading-title">
                                    Recents
                                </div>
                                <div className="display-series-heading-show-more">
                                    <Link to="/recents">
                                        &rarr;
                                    </Link>
                                </div>
                            </div>
                            <Slider {...ContextItems.movieAndSeriesSettings}>
                                {
                                    ContextItems.recents.map((element) => {
                                        return (
                                            <Link style={{ width: 250 }} onClick={() => { TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="display-series-item info-to-store">
                                                <div className="display-series-poster">
                                                    <img src={element.poster} alt="poster" />
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
                    </>
                    :
                    <>
                        <div className="loading-home-container element-info-poster-info-container">
                            <div className="loading-home-data-small-screen">
                                <div className="loading-home-data-title"></div>
                                <div className="loading-home-data-rating"></div>
                            </div>
                            <div className="loading-home-data  element-info-info">
                                <div className="loading-home-data-cell">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="loading-home-data-cell loading-home-data-cell-desc-container">
                                    <div className="loading-home-data-cell-desc-container-cell"></div>
                                    <div className="loading-home-data-cell-desc-container-cell"></div>
                                </div>
                                <div className="loading-home-data-cell">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="loading-home-data-cell">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="loading-home-data-cell">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="loading-home-data-cell">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="loading-home-data-cell">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="loading-home-poster element-info-poster-container"></div>
                        </div>
                        {
                            loadingGeneras('genera')
                        }

                        {
                            loadingSeries()
                        }
                        {
                            loadingMovies()
                        }
                    </>

            }
        </>
    )
}

export default LandingPoster




