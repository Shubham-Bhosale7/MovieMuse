import './App.css';
import DisplayTrending from './Components/DiplayTrending';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import { useContext, useEffect, useState } from 'react'
// import FetchData from './GeneralJs/FetchData';
import Footer from './Components/Footer'
import ElementInfo from "./Components/ElementInfo"
import MoreRelatedMovies from './Components/MoreRelatedMovies';
import MoreRelatedSeries from './Components/MoreRelatedSeries';
import StorageContextData from './Context/StorageContext';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"
import Movie from "./Components/Movie"
import Series from "./Components/Series"
import SearchQueryResults from './Components/SearchQueryResults';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ErrorPage from './Components/ErrorPage';
import { StorageContext } from './Context/StorageContext'
import NewPrograms from './Components/NewPrograms';
import GeneraElement from './Components/GeneraElement';


function App() {
  const ContextItems = useContext(StorageContext)
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState([])
  // const [limit, setLimit] = useState(200)
  const [loadDetector, setLoadDetector] = useState(false)


  return (
    <>
      <StorageContextData>
        <BrowserRouter>
          <LoadingBar
            color='#db0000'
            height={3}
            // progress={progress}
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<DisplayTrending setData={setData} data={data} setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/movies" element={<Movie data={data} setData={setData} setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/series" element={<Series data={data} setData={setData} setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/information/:netflix_id" element={<ElementInfo setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/related movies" element={<MoreRelatedMovies setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/related series" element={<MoreRelatedSeries setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/search_results/:query" element={<SearchQueryResults setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/error" element={<ErrorPage/>} />
            <Route exact path="/recents" element={<NewPrograms />} />
            <Route exact path="/genera/:genera" element={<GeneraElement setProgress={setProgress} setLoadDetector={setLoadDetector}/>}/>
          </Routes>
          <Footer loadDetector={loadDetector} />
        </BrowserRouter>
      </StorageContextData>
    </>
  );
}

export default App;
