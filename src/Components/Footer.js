import React from 'react'

function Footer(props) {
    return (
        <>
            {
                props.loadDetector &&
                <div className="footer">
                    <div className="social-link-list-container">
                        <ul className="social-link-list">
                            <li>
                                <a href="#">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
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