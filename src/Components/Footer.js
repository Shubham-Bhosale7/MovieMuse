import React, { useContext } from 'react'
import { StorageContext } from '../Context/StorageContext'

function Footer() {                                
    const ContextItems = useContext(StorageContext);
    return (
        <>
            {
                ContextItems.loadDetector &&
                <div className="footer">
                    <div className="social-link-list-container">
                        <ul className="social-link-list">
                            <li>
                                <a href="https://github.com/shivdutt-B" target='_blank'>
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/shivdutt-bhadakwad-07a462280/" target='_blank'>
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/shivdutt059" target='_blank'>
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default Footer 