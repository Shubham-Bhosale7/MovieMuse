import React, { useState } from 'react'
import Server from "../Assets/server.png"
import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import TransferData from '../GeneralJs/TransferData'
import GenreAndMovieFetcher from '../GeneralJs/GenreAndMovieFetcher'
import { StorageContext } from '../Context/StorageContext'
import { useNavigate } from 'react-router-dom'
import FetchGeneraElement from '../GeneralJs/FetchGeneraElement'
import LoadingScreen from '../GeneralJs/LoadingScreen'

function GeneraElement(props) {
    const ContextItems = useContext(StorageContext)
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             props.setProgress(40)
    //             props.setLoadDetector(false)

    //             ContextItems.setGeneraResult([])

    //             var myHeaders = new Headers();
    //             myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

    //             var requestOptions = {
    //                 method: 'GET',
    //                 redirect: 'follow',
    //                 headers: myHeaders
    //             };
    //             let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${ContextItems.genera}&limit=${ContextItems.generaLimit}`, requestOptions)
    //             let toJson = await apiData.json()
    //             let final =  toJson.results
    //             console.log('final', final)

    //             ContextItems.setGeneraResult(final)
    //             ContextItems.setGeneraLimit(ContextItems.generaLimit + 200)

    //             // ContextItems.setGeneraElement(fetchedData)
    //             props.setProgress(100)
    //             props.setLoadDetector(true)
    //         } catch (e) { 
    //             console.log('e',e)
    //             navigate('/error')
    //         }
    //     })()
    // }, [])

    async function fetchMore(setProgress, setLoadDetector, generaData, generaResult, navigate) {
        try {
            console.log('metch more called')
            setProgress(40)
            setLoadDetector(false)

            let generaCodes = generaData['codes']
            let generaName = generaData['name']
            let limit = generaResult[generaName]['limit'] + 100
            let offset = generaResult[generaName]['offset'] + 100


            var myHeaders = new Headers();
            myHeaders.append("apikey", `${process.env.REACT_APP_API_KEY}`);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };
            let apiData = await fetch(`https://api.apilayer.com/unogs/search/titles?genre_list=${generaCodes}&limit=${100}&offset=${offset}`, requestOptions)
            let toJson = await apiData.json()
            let final = toJson.results

            let existingData = generaResult[generaName]['elements']
            console.log('EXISTING DATA: ', existingData)
            let newData = existingData.concat(final)
            console.log('NEW DATA', newData)

            let data = { 'elements': newData, 'offset': offset, 'limit': limit, 'max': toJson.Object['total'] }
            generaResult[generaName] = data

            setProgress(100)
            setLoadDetector(true)
            console.log('else', 'RESULTS: ', generaResult, 'DATA: ', generaData)
        }
        catch (e) {
            console.log(e)
            navigate('/error')
        }
    }

    async function inFunc() {
        setIsDataLoaded(false)
        let storageData = sessionStorage.getItem('data')
        let parsedData = await JSON.parse(storageData)

        let generaName = parsedData['name']
        await FetchGeneraElement(props.setProgress, props.setLoadDetector, navigate, ContextItems.generaData, ContextItems.generaResult)

        let elements = ContextItems.generaResult[generaName]['elements']
        let offset = ContextItems.generaResult[generaName]['offset']
        let max = ContextItems.generaResult[generaName]['max']

        let d = { 'elements': elements, 'offset': offset, 'max': max }
        console.log('FLAG3', d)
        data[generaName] = d

        // setIsDataLoaded(true)

        console.log('gotcha', data)

        // setData(ContextItems.generaResult[generaName]['elements'])
    }

    useEffect(() => {
        inFunc()
    }, [])

    return (
        <>
            {
                isDataLoaded ?

                    data[Object.keys(data)[0]]['elements'].length > 0 ?
                        <>
                            <div className="movie-container">
                                <div className="wrapper-movie">
                                    <div className="carousel-movie">
                                        {
                                            data[Object.keys(data)[0]]['elements'].map((element) => {
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
                            {
                                data[Object.keys(data)[0]]['offset'] < data[Object.keys(data)[0]]['max'] ?
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
                                            {/* <i className="fa-solid fa-angle-down"></i> */}
                                        </button>
                                    </div>
                            }
                        </>
                        :
                        <>

                        </>
                    :
                    <>
                        <LoadingScreen />
                    </>
            }
        </>
    )
}

export default GeneraElement