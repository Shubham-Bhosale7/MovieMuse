//Transfer data of movie or show into session storage when it is clicked.
async function TransferData(navigate, element, setRelatedMovies, setRelatedSeries) {
    try {
        setRelatedMovies([])
        setRelatedSeries([])
        let data = {
            imdb_id: element.imdb_id,
            netflix_id: element.netflix_id,
            poster: element.poster,
            rating: element.rating,
            runtime: element.runtime,
            synopsis: element.synopsis,
            title: element.title,
            title_date: element.title_date,
            title_type: element.title_type,
            top250: element.top250,
            top250tv: element.top250tv
        }
        await sessionStorage.setItem('movieInfo', `${JSON.stringify(data)}`)
    } catch (error) {
        navigate('/error')
     }

}
export default TransferData