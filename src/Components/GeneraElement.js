import React, { useState } from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import TransferData from '../GeneralJs/TransferData'
import { StorageContext } from '../Context/StorageContext'
import { useNavigate } from 'react-router-dom'
import FetchGeneraElement from '../GeneralJs/FetchGeneraElement'
import loadingScreen from '../GeneralJs/LoadingMoviesAndSeries'

function GeneraElement(props) {
    const ContextItems = useContext(StorageContext)
    const navigate = useNavigate()
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [currentGenera, setCurrentGenera] = useState()

    async function fetchMore(setProgress, setLoadDetector, generaData, generaResult, navigate) {
        try {
            setProgress(40)
            setLoadDetector(false)

            let storageData = sessionStorage.getItem('data')
            let parsedData = JSON.parse(storageData)
            let generaCodes = parsedData['codes']
            let generaName = parsedData['name']
            let limit = generaResult[generaName]['limit'] + 100

            var myHeaders = new Headers();
            myHeaders.append("apikey", "c98JcNXxEUlHpsP5c53Wf3vtY3EXvC1g");

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };

            let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${generaCodes}&limit=${limit}`, requestOptions)

            let toJson = await apiData.json()
            let final = toJson.results

            let newData = final

            let data = { 'elements': newData, 'limit': limit, 'max': toJson.Object['total'] }
            generaResult[generaName] = data

            setProgress(100)
            setLoadDetector(true)
        }
        catch (e) {
            navigate('/error')
        }
    }

    async function inFunc() {
        setIsDataLoaded(false)
        let storageData = sessionStorage.getItem('data')
        let parsedData = await JSON.parse(storageData)

        let generaName = parsedData['name']
        setCurrentGenera(generaName)
        await FetchGeneraElement(props.setProgress, props.setLoadDetector, navigate, ContextItems.generaData, ContextItems.generaResult)

        setIsDataLoaded(true)
    }

    useEffect(() => {
        inFunc()
    }, [])

    return (
        <>
            {
                isDataLoaded ?
                    ContextItems.generaResult[currentGenera]['elements'].length > 0 ?
                    <>
                            <div className="movie-container">
                                <div className="wrapper-movie">
                                    <div className="carousel-movie">
                                        {
                                           ContextItems.generaResult[currentGenera]['elements'].map((element) => {
                                                return (
                                                    <Link onClick={() => { TransferData(navigate, element, ContextItems.setRelatedMovies, ContextItems.setRelatedSeries) }} to={`/information/${element.netflix_id}`} key={element.netflix_id} className="movie-item info-to-store">
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
                            {
                                ContextItems.generaResult[currentGenera]['elements'].length < ContextItems.generaResult[currentGenera]['max'] ?
                                    <div className="movie-show-more-btn-container">
                                        <button onClick={() => { fetchMore(props.setProgress, props.setLoadDetector, ContextItems.generaData, ContextItems.generaResult, navigate) }} className="movie-show-more-btn">
                                            <span>Show More</span>
                                            <i className="fa-solid fa-angle-down"></i>
                                        </button>
                                    </div>
                                    :
                                    <div className="movie-show-more-btn-container">
                                        <button className="movie-show-more-btn">
                                            <span>Thats all</span>
                                        </button>
                                    </div>
                            }
                        </>
                        :
                        <></>
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

export default GeneraElement