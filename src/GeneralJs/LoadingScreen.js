import React from 'react'

function LoadingScreen() {
    function exoElement() {
        let elementArray = []
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight
        let totalArea = windowHeight * windowWidth
        let numberOfElements = Math.floor(totalArea / 250)
        // for (let i = 0; i < numberOfElements; i++) {
        //     return (
        //         elementArray.push(
        //             <div className="movie-item info-to-store" key={i} style={{ border: "1px solid red", width: '250px' }}>
        //                 <div className="movie-poster">
        //                     Poster
        //                 </div>
        //                 <div className="movie-info">
        //                     <div className="movie-name-rating-container">
        //                         <div className="movie-name">
        //                             Some text
        //                         </div>
        //                         <div className="movie-rating">
        //                             Some text
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         )
        //     )

        // }
        

        let exoSeries = [];
        for (let i = 0; i < numberOfElements; i++) {
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
                    {exoSeries}
            </div>
        )

        return elementArray
    }
    return (
        <>
            {
                exoElement()
            }
        </>
    )
}

export default LoadingScreen