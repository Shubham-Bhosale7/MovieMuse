import React from 'react'
import Logo from "../Assets/quad-logo.png"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { StorageContext } from "../Context/StorageContext"
import { useState } from "react"
import { useContext } from 'react'

function Navbar() {
    const [inputData, setInputData] = useState('')
    const navigate = useNavigate();
    const ContextItems = useContext(StorageContext)

    window.onresize = () => {
        if (window.innerWidth > 700 && document.querySelector('.search-bar-small-screen').classList.contains('search-bar-small-screen-visible')) {
            ContextItems.handleSearchIcon()
        }
    }

    return (
        <>
            <div className="nav-bar" id="top-point">
                <div className="nav-bar-logo">
                    <Link to='./' className='nav-bar-poster-link'>
                        <img src={Logo} alt="" />
                    </Link>
                    <div className="nav-bar-links">
                        <ul className="nav-bar-list nav-bar-list-hide">
                            <li className="nav-link">
                                <Link to="/" onClick={ContextItems.handleHamCross}>Home</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/movies" onClick={ContextItems.handleHamCross}>Movies</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/series" onClick={ContextItems.handleHamCross}>Web series</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="search-area">
                    <form action="" onSubmit={async (event) => {
                        event.preventDefault()
                        event.target.reset();
                        ContextItems.setQuery(inputData)
                        navigate(`/search_results/${inputData}`);
                    }}>
                        <input placeholder="Search your favorite show" className="search-box" type="text" onChange={(event) =>
                            setInputData(event.target.value)
                        } />
                        <i class="fa-solid fa-magnifying-glass extend-search-bar" onClick={() => {document.getElementsByClassName('search-box')[0].classList.toggle('search-box-visible') }}></i>

                    </form>
                </div>
                <div className="ham-menu-container">
                    <i className="fa-solid fa-magnifying-glass" onClick={ContextItems.handleSearchIcon}></i>
                    <i className="fa-solid fa-bars" onClick={ContextItems.handleHamCross}></i>
                    <i className="fa-solid fa-xmark ham-cross-toggler" onClick={ContextItems.handleHamCross}></i>
                </div>
            </div >
            <div className="search-bar-small-screen">
                <form action="" onSubmit={async (event) => {
                    event.preventDefault()
                    event.target.reset();
                    ContextItems.setQuery(inputData)
                    navigate('/search results');
                    ContextItems.handleSearchIcon()
                }}>
                    <input id="search-box" placeholder="Search your favorite show" type="text" className="search-bar-small-screen-search-area" onChange={(event) =>
                        setInputData(event.target.value)
                    } />
                </form>
            </div>
        </>
    )

}

export default Navbar