import './App.css';
import DisplayTrending from './Components/DiplayTrending';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'
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
import GeneraElement from './Components/GeneraElement';
import NewPrograms from './Components/NewPrograms';


function App() {
  const [progress, setProgress] = useState(0)
  const [loadDetector, setLoadDetector] = useState(false)

  return (
    <>
      <BrowserRouter>
        <StorageContextData>
          <LoadingBar
            color='#db0000'
            height={3}
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<DisplayTrending />} />
            <Route exact path="/movies" element={<Movie setProgress={setProgress} />} />
            <Route exact path="/series" element={<Series setProgress={setProgress} />} />
            <Route exact path="/information/:netflix_id" element={<ElementInfo />} />
            <Route exact path="/related movies" element={<MoreRelatedMovies setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/related series" element={<MoreRelatedSeries setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/search_results/:query" element={<SearchQueryResults setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/error" element={<ErrorPage setProgress={setProgress} />} />
            <Route exact path="/genera/:genera" element={<GeneraElement setProgress={setProgress} setLoadDetector={setLoadDetector} />} />
            <Route exact path="/recents" element={<NewPrograms />} />      
          </Routes>
          <Footer />
        </StorageContextData>
      </BrowserRouter>
    </>
  );
}

export default App;
