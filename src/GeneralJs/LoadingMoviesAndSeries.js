function genEle() {
    const arrayOfElements = [];
    for (let i = 0; i < 50; i++) {
        arrayOfElements.push(
            <div className="loading-screen-element-container">
                <div className="loading-screen-element-poster">

                </div>
                <div className="loading-screen-element-desc">
                    <div className="loading-screen-element-desc-title"></div>
                    <div className="loading-screen-element-desc-rating"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="movie-container-loading">
            {arrayOfElements}
        </div>
    )
}

export default genEle